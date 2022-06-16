import EventManager from "../utils/EventManager";

import { log } from "aftc-modules/src/debug/log";

export class Test1 {


    // - - - - - - - - - - - - -
    constructor() {
        log(`Test1()`);
        // this.rc = rootController;


        EventManager.addEventListener("evt1", () => {
            console.log("evt1 fn run");
        })

        EventManager.addEventListener("evt2");

        EventManager.listEvents();

        EventManager.onEvent("test1", () => {
            console.log("subscriber:test1 - 1 - run")
        },"t1sub1")

        // EventManager.subscribe("test2", () => {
        //     console.log("subscriber:test2 - 1 - run")
        // },"sub2")

        // EventManager.subscribe("test2", () => {
        //     console.log("subscriber:test2 - 2 - run")
        // },"sub3")

        // EventManager.dispatch("test1",1,2,3);
        // EventManager.dispatch("test2","a","b");


        EventManager.addStateWatcher("watchA",this.a)
        EventManager.onStateChange("watchA","watcherTest1",()=>{
            log("VALUE OF A HAS CHANGED")
        });



        // EventManager.add("test1", () => {
        //     console.log("TESTING test1!")
        // })
        // EventManager.add("test2", this.test)
        // EventManager.list();
        // EventManager.removeAll();
        // EventManager.list();

        // EventManager.subscribe("test1",this.test);

        // EventManager.dispatch("test2")
        // EventManager.dispatch("test2","hello there")
        // EventManager.dispatch("test2",1)
        // EventManager.dispatch("test2",false)
        // EventManager.dispatch("test2",{"info":"me"})

        // EventManager.remove("bob");
        // EventManager.dispatch("bob")
        // EventManager.test(4);
        // EventManager.init();
        // EventManager.init();
        // EventManager();
        // EventManager.test();
        // EventManager().init();
        // console.warn(EventManager())
        // console.warn(EventManager.a)
        // EventManager.init();
        // EventManager.init();
        return;

    }
    // - - - - - - - - - - - - -
}
