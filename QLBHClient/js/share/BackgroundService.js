import BackgroundTimer from 'react-native-background-timer'
import Network from './Network'
import EventDispatcher from './EventDispatcher'
import Logger from './Logger'
class BackgroundService {
    constructor(){
        this.INTERVAL_BACKGROUND_MS = 5000;
        this.createEventDispatcher();
    }
    createEventDispatcher = () =>{
        this.eventDispatcher = new EventDispatcher();
    };
    runService = () =>{

        Network.getScheduleInfo((err,data,response)=>{
            if(err) return;
            this.eventDispatcher.dispatch("scheduleData",data);
        });
    };
    addHandle = (handle)=>{
        this.eventDispatcher.registerEvent("scheduleData",handle);
    };
    runServiceInBackground = () =>{
        Logger.log.debug("Performing background task!!");
        this.runService();
    };
    runServiceManually = () =>{
        Logger.log.debug("Performing background manually!!");
        this.runService();
    };
    detachAllHandler = () =>{
        this.eventDispatcher.reset();
    };
    start = (runImmediately = true) =>{
        if(runImmediately){
            this.runServiceManually();
        }
        Logger.log.debug("Starting background timer!");
        BackgroundTimer.runBackgroundTimer(() => {
                this.runServiceInBackground();
            },
            this.INTERVAL_BACKGROUND_MS);
    };
    stop = () =>{
        Logger.log.debug("Stopping background timer!");
        BackgroundTimer.stopBackgroundTimer();
    };
}

export default (new BackgroundService)