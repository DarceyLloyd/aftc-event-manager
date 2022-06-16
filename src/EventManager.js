// INFO
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event data structure
// {
//     "eventName": {
//         "subscribers": [],
//         "globalCallbackFunction": null
//     }
// }
//
// Subscriber entry data structure
// {
//     "name":"",
//     "callbackFunction": null
// }
//
// State Watcher data structure
// {
//     "watcherName": {
//         "subscribers": []
//     }
// }
//
// State watcher subsribers entry data structure
// {
//     "name":"",
//     "callbackFunction": null
// }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// Var defs
var initDone = false;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// Private functions to the EventManager
const log = (arg) => { console.log(arg); }

const init = () => {
    if (initDone === true) {
        return;
    }
    // This will store {"evtName":string,"optionalCallbackFunction"}
    window.AFTCEventManager = {
        events: {},
        watchers: {}
    };
    initDone = true;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const eventExists = (evtName) => {
    return window.AFTCEventManager.hasOwnProperty(evtName);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const listEvents = () => {
    init();

    if (Object.keys(window.AFTCEventManager).length < 1) {
        console.warn("EventManager has no events to list...")
        return;
    }

    console.warn(window.AFTCEventManager);

    let c = 0;
    let msg = "EventManager events:\n";
    Object.keys(window.AFTCEventManager).forEach(eventName => {
        c++;
        let subscribers = window.AFTCEventManager[eventName].subscribers;
        let fn = window.AFTCEventManager[eventName].globalCallbackFunction;

        log(subscribers);

        if (fn === null){
            msg += `Name: ${eventName} - globalCallbackFunction: Not set\n`
        } else {
            msg += `Name: ${eventName} - globalCallbackFunction: Set\n`
        }
        if (subscribers.length > 0){
            for (let sub of subscribers){
                msg += ""
            }
        }

    })
    console.warn(msg);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const getEventByName = (eventName) => {
    init();
    if (window.AFTCEventManager.hasOwnProperty(eventName) === false) {
        console.error(`EventManager: Usage Error: Event not found "${eventName}"...`);
        return false;
    } else {
        return window.AFTCEventManager[eventName];
    }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const EventManager = {

    listEvents: function () {
        listEvents();
    },
    // - - - - - - - - - - - - - - - - - - - -
    removeAllEvents: function (eventName) {
        // console.log(getEventByName(eventName));
        window.AFTCEventManager = null;
        initDone = false;
        init();
    },
    // - - - - - - - - - - - - - - - - - - - -
    addEventListener: function (eventName, onEventGlobalCallbackFn) {
        init();

        // validate inputs
        if (eventName == null || eventName == undefined || eventName == "") {
            console.error(`EventManager: USAGE ERROR: Please set an event name.`);
            return;
        }
        if (typeof (eventName) !== "string") {
            console.error(`EventManager: USAGE ERROR: Event names must be strings.`);
            return;
        }

        if (window.AFTCEventManager.hasOwnProperty(eventName) === true) {
            console.error(`EventManager: USAGE ERROR: Event "${eventName}" already exists.`);
            return;
        }

        if (onEventGlobalCallbackFn == null || onEventGlobalCallbackFn == undefined || onEventGlobalCallbackFn == "") {
            // Adding an event that's pureley for subscribing to
            window.AFTCEventManager[eventName] = {
                "subscribers": [],
                "globalCallbackFunction": null
            };
        } else {
            if (typeof (onEventGlobalCallbackFn) !== "function") {
                console.error(`EventManager: USAGE ERROR: onEventGlobalCallbackFn must be a function.`);
                return;
            }

            // Adding an event with a callback function
            window.AFTCEventManager[eventName] = {
                "subscribers": [],
                "globalCallbackFunction": onEventGlobalCallbackFn
            };
        }
    },
    // - - - - - - - - - - - - - - - - - - - -
    subscribe: function (eventName) {
        init();

        if (window.AFTCEventManager.hasOwnProperty(eventName) === false) {
            // console.warn(`EventManager: USAGE WARNING: Unable to remove event "${eventName}" as it doesn't exist.`);
        } else {
            // delete window.AFTCEventManager[eventName];
        }
    },
    // - - - - - - - - - - - - - - - - - - - -
    remove: function (evtName) {
        init();

        if (window.AFTCEventManager.hasOwnProperty(evtName) === false) {
            console.warn(`EventManager: USAGE WARNING: Unable to remove event "${evtName}" as it doesn't exist.`);
        } else {
            delete window.AFTCEventManager[evtName];
        }
    },
    // - - - - - - - - - - - - - - - - - - - -
    removeAll: function () {
        init();

        Object.keys(window.AFTCEventManager).forEach(key => {
            delete window.AFTCEventManager[key];
        })
    },
    // - - - - - - - - - - - - - - - - - - - -
    dispatch: function (...args) {
        init();

        if (args.length < 1) {
            console.error(`EventManager: USAGE ERROR: Please specify the event name/string you wish to dispatch (D-EC1).`);
            return;
        }

        let evtName = args[0];

        if (Object.keys(args).length > 0) {
            args.shift();
        }


        if (typeof (evtName) !== "string") {
            console.error(`EventManager: USAGE ERROR: The event you wish to dispatch must be a string.`);
            return;
        }

        if (evtName == "" || evtName == null || evtName == undefined) {
            console.error(`EventManager: USAGE ERROR: Please specify the event name/string you wish to dispatch (D-EC2).`);
            return;
        }

        if (window.AFTCEventManager.hasOwnProperty(evtName) === false) {
            console.error(`EventManager: ERROR: Unable to dispatch event "${evtName}" as it doesn't exist.`);
            return false;
        } else {
            if (Object.keys(args).length > 0) {
                window.AFTCEventManager[evtName].onEventCallbackFunction(...args);
            } else {
                window.AFTCEventManager[evtName].onEventCallbackFunction();
            }

        }
    }
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default EventManager;