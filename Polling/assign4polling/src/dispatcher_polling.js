import { ajax } from 'rxjs/ajax'
import { interval, of, merge } from 'rxjs'
import { map, concatMap, share, takeWhile } from 'rxjs/operators'

let isPooling = true;
const poll_url = url =>
    interval(10000)
        .pipe(concatMap(() => ajax.getJSON(url)))
        .pipe(takeWhile(x => isPooling))

const poll_warning = warning =>
    poll_url(`http://localhost:8080/warnings/`, warning)

const start_warnings = (httpCall) => {
    const warning = ajax(httpCall)
        .pipe(map(res => res.response))
        .pipe(share())

    const newWarning = warning.pipe(concatMap(poll_warning))

    return merge(warning, newWarning).pipe(map(warning => ({ type: 'keepUpdating', warning })))
}

export const dispatcher_server = (action) => {
    switch (action.type) {
        case 'polling': {
            return start_warnings({ url: 'http://localhost:8080/warnings' }, isPooling = true)
        }

        case 'stopPolling': {
            return start_warnings({ url: 'http://localhost:8080/warnings' }, isPooling = false)
        }

        case 'severityLevel':
            isPooling = false
            return ajax.getJSON('http://localhost:8080/warnings').pipe(map(warnings => ({ type: 'severityLevel', param: action.param, warnings })))

        default:
            return of(action)
    }
}