import ReactDOM from 'react-dom';
import { get_model } from './model'
import './index.css';
import { create_view } from './view'
import { reduce } from './reducer'
import { dispatcher_server } from './dispatcher_polling';

import { ajax } from 'rxjs/ajax'
import { Subject } from 'rxjs'
import { map, mergeMap, scan } from 'rxjs/operators'


let init_warnings = {}
async function init() {
  try {
    init_warnings = await fetch('http://localhost:8080/warnings').then(res => res.json())
  }
  catch (err) {
    console.log(err)
  }
}

init()

ajax.getJSON('http://localhost:8080/Warnings')
  .subscribe(warnings => {
    const actions = new Subject()
    const dispatch = action => actions.next(action)

    let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))

    const theView = create_view(dispatch)

    const init_state = get_model({ init_warnings })

    renderer(theView(init_state))

    actions
      .pipe(mergeMap(dispatcher_server))
      .pipe(scan(reduce, init_state))
      .pipe(map(theView))
      .subscribe(renderer)
  })