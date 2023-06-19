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
            "tags_id": [3508],
            "happed_at": "2020-10-29T16:00:00.000Z",
            "created_at": "2020-10-29T16:00:00.000Z",
            "updated_at": "2020-10-29T16:00:00.000Z",
            "kind": "expenses"
        }
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