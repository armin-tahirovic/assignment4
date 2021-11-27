import { update_model, severityLevel } from './model'

export function reduce(model, action) {

    switch (action.type) {
        case 'polling':
            return update_model(action)

        case 'subscribe':
            return { ...model, message: 'subscribe' }

        case 'severityLevel':
            return severityLevel(action)

        case 'unsubscribe':
            return { ...model, message: 'unsubscribe' }

        default:
            return model
    }
}