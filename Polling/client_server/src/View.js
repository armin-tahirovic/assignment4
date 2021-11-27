import React from "react";

const WarningData = ({ warning }) => [
    <td key='severity'>{warning.severity}</td>,
    <td key='from'>{warning.prediction.from}</td>,
    <td key='to'>{warning.prediction.to}</td>,
    <td key='type'>{warning.prediction.type}</td>,
    <td key='unit'>{warning.prediction.unit}</td>,
    <td key='time'>{warning.prediction.time}</td>,
    <td key='place'>{warning.prediction.place}</td>
]

const WarningRow = (props) => (
    <tr>
        <WarningData {...props} />
    </tr>
)

const WarningDataBody = ({ model }) => (
    <tbody>
        {

            model.Warning().map(warning => <WarningRow key={warning.id.toString()} {...{ warning }} />)
        }

    </tbody>
)

const data_view = dispatch => ({ newModel }) =>
    <div id='base'>
        <div>
            <h1>Warnings</h1>
            <select id="severityLevel">
                <option value="1">Severity level 1</option>
                <option value="2">Severity level 2</option>
                <option value="3">Severity level 3</option>
                <option value="4">Severity level 4</option>
                <option value="5">Severity level 5</option>
            </select>
            <button id='polling'
                onClick={() => dispatch({ type: "severityLevel", param: document.getElementById('severityLevel').value })}>
                Set severity level
            </button>
            <button id='server'
                onClick={() => dispatch({ type: "subscribe" })}>
                send til server
            </button>

            <button id='unsub'
                onClick={() => dispatch({ type: "unsubscribe" })}>
                unsub til server
            </button>
            <table id='weather'>
                <thead>
                    <tr>
                        <td>severity</td>
                        <td>from</td>
                        <td>to</td>
                        <td>type</td>
                        <td>Unit</td>
                        <td>Time</td>
                        <td>Place</td>
                    </tr>
                </thead>
                <WarningDataBody model={newModel} />
            </table>
        </div>
    </div>


const start_view = dispatch => () =>
    <div>
        <button id='polling'
            onClick={() => dispatch({ type: "polling" })}>
            se data
        </button>

        <button id='server'
            onClick={() => dispatch({ type: "subscribe" })}>
            sub til server
        </button>

        <button id='unsub'
            onClick={() => dispatch({ type: "unsubscribe" })}>
            unsub til server
        </button>
    </div>

const View = ({ model, dispatch }) => model.accept({
    start_screen: start_view(dispatch),
    data_screen: data_view(dispatch)
})



export const create_view = dispatch => model => <View model={model} dispatch={dispatch} />