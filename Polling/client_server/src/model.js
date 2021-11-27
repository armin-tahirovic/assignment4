export const model = (warnings) => {

    const addWarning = w => model(warnings.concat(w))

    const MakeWarning = w => model([w])

    const Severity = (severityValue) => model(warnings.filter(x => x.severity >= severityValue))

    const Warning = () => warnings
        .filter(w => w.severity > 0)
        .sort((a, b) => (a.id > b.id) ? -1 : 1)

    return { addWarning, MakeWarning, Severity, Warning }
}

export function get_model() {
    return {
        accept: ({ start_screen }) => { if (start_screen) return start_screen() }
    }
}

export function severityLevel(action) {
    let filtertModel = model()
    let newModel = filtertModel.Severity(action.param)

    return {
        newModel,
        accept: ({ see_warnings }) => { if (see_warnings) return see_warnings({ newModel }) }
    }
}

export function update_model(action) {
    if (action.server_msg.id && action.server_msg.severity > 0) {
        let newModel = model().MakeWarning(action.server_msg)

        return {
            newModel,
            accept: ({ data_screen }) => { if (data_screen) return data_screen({ newModel }) }
        }
    } else if (action.server_msg.warnings) {
        let newWarnings = action.server_msg.warnings.filter(w => w.severity > 0)

        if (newWarnings > 0) {
            let newModel = model(action.server_msg.warnings)

            return {
                newModel,
                accept: ({ data_screen }) => { if (data_screen) return data_screen({ newModel }) }
            }
        }

        else {
            return {
                accept: ({ start_screen }) => { if (start_screen) return start_screen() }
            }
        }
    } else {
        return {
            accept: ({ start_screen }) => { if (start_screen) return start_screen() }
        }
    }
}
