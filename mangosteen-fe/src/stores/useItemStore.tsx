import { defineStore } from "pinia";
import { http } from "../shared/Http";
import { Time } from "../shared/time";

type State = {
    items: Item[]
    hasMore: boolean
    page: number,
    status: boolean
}
type Actions = {
    // reset: () => void
    fetchItems: (startDate?: string, endDate?: string) => void,
    _fetch: (firstPage: boolean, startDate?: string, endDate?: string) => void,
    fetchNextPage: (startPage?: string, endDate?: string) => void
}

export const useItemStore = (id: string | (string | undefined)[]) =>
    defineStore<string, State, {}, Actions>(typeof id === 'string' ? id : id.join('-'), {
        state: () => ({
            items: [],
            hasMore: false,
            page: 0,
            status: false
        }),
        actions: {
            // reset() {
            //     this.items = []
            //     this.hasMore = false
            //     this.page = 0
            // },
            async _fetch(firstPage, startDate, endDate) {
                if (!startDate || !endDate) {
                    return
                }
                endDate = new Time(endDate + 'T00:00:00.000+0800').add(1, 'day').format()
                const response = await http.get<Resources<Item>>('/items', {
                    happen_after: startDate,
                    happen_before: endDate,
                    page: firstPage ? 1 : this.page + 1
                }, {
                    _mock: 'itemIndex',
                    _autoLoading: true
                }
                )
                const { resources, pager } = response.data
                // this.items?.push(...resources)
                if (firstPage) {
                    this.items = resources
                } else {
                    this.items.push(...resources)
                }
                this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
                this.page += 1
                this.status = true
            },
            async fetchNextPage(startDate, endDate) {
                this._fetch(false, startDate, endDate)
            },
            async fetchItems(startDate, endDate) {
                this._fetch(true, startDate, endDate)
            }
        }
    })