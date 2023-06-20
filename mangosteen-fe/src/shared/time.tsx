/*
    example
    import { Time } from 'shared/time';
    const time = new Time();
    time.format('YYYY-MM-DD');
    time.firstDayOfMonth();
    time.firstDayOfYear();
    time.lastDayOfMonth();
    time.lastDayOfYear();
    time.add(1, 'month');
    time.subtract(1, 'month');
*/
export class Time {
    date: Date;
    // constructor(date = new Date()) {
    //     this.date = date;
    // }
    constructor(date?: string | Date) { // 类型： string 或者 date，当然也可以不传
        if(date === undefined) {
            this.date = new Date();
        } else if(typeof date === 'string') {
            this.date = new Date(date);
        } else {
            this.date = date
        }
    }
    format(pattern = 'YYYY-MM-DD') {
        //pattern
        // YYYY
        // MM
        // DD
        // HH
        // mm
        // ss
        // SSS

        //所有的api都写到原型上面
        const year = this.date.getFullYear()
        const month = this.date.getMonth() + 1
        const day = this.date.getDate()
        const hour = this.date.getHours()
        const minute = this.date.getMinutes()
        const second = this.date.getSeconds()
        const msecond = this.date.getMilliseconds()
        return pattern.replace(/YYYY/g, year.toString())
            .replace(/MM/, month.toString().padStart(2, '0'))
            .replace(/DD/, day.toString().padStart(2, '0'))
            .replace(/HH/, hour.toString().padStart(2, '0'))
            .replace(/mm/, minute.toString().padStart(2, '0'))
            .replace(/ss/, second.toString().padStart(2, '0'))
            .replace(/SSS/, msecond.toString().padStart(3, '0'))
    }
    firstDayOfMonth() {
        return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0))
    }
    firstDayOfYear() {
        return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0))
    }
    lastDayOfMonth() {
        return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0))
    }
    lastDayOfYear() {
        return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0))
    }
    getRaw() {
        return this.date
    }
    getTimestamp() {
        return this.date.getTime()
    }
    add(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond') {
        const date = new Date(this.date.getTime())
        switch (unit) {
            case 'year':
                date.setFullYear(date.getFullYear() + amount)
                break;
            case 'month':
                // 1.31 + 1m = 2.28/2.29
                const d = date.getDate() //1.31
                date.setDate(1) // 1.1
                date.setMonth(date.getMonth() + amount)
                const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate()
                date.setDate(Math.min(d, d2))
                // date.setMonth(date.getMonth() + amount)
                break;
            case 'day':
                date.setDate(date.getDate() + amount)
                break;
            case 'hour':
                date.setHours(date.getHours() + amount)
                break;
            case 'minute':
                date.setMinutes(date.getMinutes() + amount)
                break;
            case 'second':
                date.setSeconds(date.getSeconds() + amount)
                break;
            case 'millisecond':
                date.setMilliseconds(date.getMilliseconds() + amount)
                break;
            default:
                throw new Error('Time.add: unknown unit')
        }
        return new Time(date)
    }
}
// export const time = (date = new Date()) => {
//     const api = {
//     }
//     return api
// }

