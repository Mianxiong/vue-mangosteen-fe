interface FData {
    [k: string]: string | number | null | undefined | FData
}
// Rule拿到这个T，放到key上面
type Rule<T> = {
    // key: string
    key: keyof T
    message: string
} & (
        { type: 'required' } |
        { type: 'pattern', regex: RegExp }
    )
// Rules接受这个T
type Rules<T> = Rule<T>[]
export type { Rule, Rules, FData}
// const r: Rule = {
//     key: 'name', message: 'hi', type: 'pattern', regex: /hi/
// }
// T 代指 FData
// 表达的是 如果用 T 表示 formData的类型，那么 Rules 的 key 必须是 T 的 key
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
    type Errors = {
        [k in keyof T]?: string[]
    }

    const errors: Errors = {}
    rules.map(rule => {
        const { key, type, message } = rule
        const value = formData[key]

        switch (type) {
            case 'required':
                if (value === null || value === undefined || value === '') {
                    errors[key] = errors[key] || []
                    errors[key]?.push(message)
                }
                break;
            case 'pattern':
                if (value && !rule.regex.test(value.toString())) {
                    errors[key] = errors[key] || []
                    errors[key]?.push(message)
                }
                break;
            default:
                return;
        }
    })
    return errors
}

function isEmpty(value: null | undefined | string | number | FData) {
    return value === null || value === undefined || value === ''
}

export function hasError(errors: Record<string, string[]>) {
    // return Object.values(errors).reduce((result, value) => result + value.length, 0) > 0
    let result = false
    for(let key in errors) {
        if (errors[key]?.length > 0) {
            result = true
            break
        }
    }
    return result
}