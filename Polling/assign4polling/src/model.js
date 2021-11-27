export const model = (warnings) => {

    const Warning = () => warnings
        .sort((a, b) => (a.id > b.id) ? -1 : 1)

    const Severity = (severityValue) => model(warnings.filter(x => x.severity >= severityValue))

    return { Warning, Severity }
}

export function warning_state({ init_warnings }) {
    let newModel = model(init_warnings.warnings)
    return {
        init_warnings, newModel,
        accept: ({ see_warnings }) => { if (see_warnings) return see_warnings({ init_warnings, newModel }) }
    }
}

export function severityLevel(action) {
    let severityModel = model(action.warnings.warnings)
    let newModel = severityModel.Severity(action.param)

    return {
        newModel,
        accept: ({ see_warnings }) => { if (see_warnings) return see_warnings({ newModel }) }
    }
}

export function get_warnings({ warnings }) {
    let newModel = model(warnings)
    return {
        newModel,
        accept: ({ warning_list }) => { if (warning_list) return warning_list({ newModel }) }
    }
}

export function get_model({ init_warnings }) {
    let newModel = model(init_warnings.warnings)

    return {
        init_warnings, newModel,
        accept: ({ visit_pre_warning }) => { if (visit_pre_warning) return visit_pre_warning({ init_warnings, newModel }) }
    }
}