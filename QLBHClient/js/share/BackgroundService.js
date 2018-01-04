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
    runService = (callback = null) =>{

        Network.getScheduleInfo((err,data,response)=>{
            if(err) return;
            if(callback!== null) callback(err,data,response);
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
    runServiceManually = (callbackInRunManually) =>{
        Logger.log.debug("Performing background manually!!");
        this.runService(callbackInRunManually);
    };

    start = (runImmediately = true, callbackInRunManually) =>{
        if(runImmediately){
            this.runServiceManually(callbackInRunManually);
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