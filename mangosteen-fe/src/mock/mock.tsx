import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios';

type Mock = (config: AxiosRequestConfig) => [number, any] //number:状态码  any:任意类型

faker.setLocale('zh_CN');

export const mockItemCreate: Mock = config => {
    // return [422, {
    //     errors: {
    //         tags_id: ['必须选择标签'],
    //         amount: ['金额不能为零']
    //     }
    // }]
    return [200, {
        resource: {
            "id": 2264,
            "user_id": 1312,
            "amount": 9900,
            "note": null,
            "tag_ids": [3508],
            "happen_at": "2020-10-29T16:00:00.000Z",
            "created_at": "2020-10-29T16:00:00.000Z",
            "updated_at": "2020-10-29T16:00:00.000Z",
            "kind": "expenses"
        } as Item
    }]
}

export const mockSession: Mock = (config) => {
    return [200, {
        jwt: faker.random.word()
    }]
}

let id = 0
const createId = () => {
    id += 1
    return id
}

export const mockTagIndex: Mock = (config) => {
    const { kind, page } = config.params
    const per_page = 25
    const count = 26

    const createPager = (page = 1) => ({
        page, per_page, count
    })
    const createTag = (n = 1, attrs?: any) =>
        Array.from({ length: n }).map(() => ({
            id: createId(),
            name: faker.lorem.word(),
            sign: faker.internet.emoji(),
            kind: config.params.kind,
            ...attrs
        }))
    const createBody = (n = 1, attrs?: any) => ({
        resources: createTag(n), pager: createPager(page)
    })
    if (kind === 'expenses' && (!page || page === 1)) {
        // return [200, { resources: createTag(25), pager: createPager(page) } as Resources<Tag>]
        return [200, createBody(25)]
    } else if (kind === 'expenses' && page === 2) {
        // return [200, { resources: createTag(1), pager: createPager(page) } as Resources<Tag>]
        return [200, createBody(1)]
    } else if (kind === 'income' && (!page || page === 1)) {
        return [200, createBody(25)]
    } else {
        return [200, createBody(1)]
    }


}

export const mockTagShow: Mock = config => {
    const createTag = (n = 1, attrs?: any) =>
    ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: 'expenses',
        ...attrs
    })
    return [200, { resource: createTag() }]
}

export const mockTagEdit: Mock = config => {
    const createTag = (attrs?: any) =>
    ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: 'expenses',
        ...attrs
    })
    return [200, { resource: createTag() }]
}

export const mockItemIndex: Mock = (config) => {
    const { kind, page } = config.params
    const per_page = 25
    const count = 26
    const createPaper = (page = 1) => ({
        page,
        per_page,
        count,
    })
    const createTag = (attrs?: any) =>
    ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: 'expenses',
        ...attrs
    })
    const createItem = (n = 1, attrs?: any) =>
        Array.from({ length: n }).map(() => ({
            id: createId(),
            user_id: createId(),
            amount: Math.floor(Math.random() * 10000),
            tag_ids: [createId()],
            tags: [createTag()],
            happen_at: faker.date.past().toISOString(),
            kind: config.params.kind,
        } as Item))
    const createBody = (n = 1, attrs?: any) => ({
        resources: createItem(n),
        pager: createPaper(page),
        summary: {
            income: 9900,
            expenses: 9900,
            balance: 0
        }
    })
    if (!page || page === 1) {
        return [200, createBody(25)]
    } else if (page === 2) {
        return [200, createBody(1)]
    } else {
        return [200, {}]
    }
}

export const mockItemIndexBalance: Mock = config => {
    return [200, {
        expenses: 9900,
        income: 9900,
        balance: 0
    }]
}

export const mockItemSummary: Mock = (config) => {
    const { group_by, kind } = config.params
    if (group_by === 'happen_at' && kind === 'expenses') {
        return [
            200,
            {
                groups: [
                    { happen_at: '2023-06-18T00:00:00.000+0800', amount: 100 },
                    { happen_at: '2023-06-22T00:00:00.000+0800', amount: 300 },
                    { happen_at: '2023-06-29T00:00:00.000+0800', amount: 200 }
                ],
                summary: 600
            }
        ]
    } else if (group_by === 'happen_at' && kind === 'income') {
        return [
            200,
            {
                groups: [
                    { happen_at: '2023-06-08T00:00:00.000+0800', amount: 100 },
                    { happen_at: '2023-06-12T00:00:00.000+0800', amount: 300 },
                    { happen_at: '2023-06-19T00:00:00.000+0800', amount: 200 }
                ],
                summary: 600
            }
        ]
    } else if (group_by === 'tag_id' && kind === 'expenses') {
        return [
            200,
            {
                groups: [
                    { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 100 },
                    { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
                    { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
                ],
                summary: 600
            }
        ]
    } else {
        return [
            200,
            {
                groups: [
                    { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 400 },
                    { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
                    { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
                ],
                summary: 900
            }
        ]
    }
}