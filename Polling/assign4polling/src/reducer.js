import { warning_state, get_warnings, severityLevel } from './model'

let warnings = {}
async function init() {
    try { warnings = await fetch('http://localhost:8080/warnings').then(res => res.json()) }
    catch (err) {
        console.log(err)
    }
}
init()

export function reduce(model, action) {

    switch (action.type) {
        case 'polling':
            return warning_state(model, action)

        case 'severityLevel':
            return severityLevel(action)

        case 'keepUpdating':
            init()
            return get_warnings(warnings, action)

        case 'stopUpdating':
            return get_warnings(warnings, action)

        default:
            return model
    }
}