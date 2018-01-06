import createLogger from 'react-native-log-level'
class Logger{
    constructor(){
        this.log = createLogger({
            // level: 'trace' // Optionally set the log level. Defaults to 'info'
            level: 'info' // Optionally set the log level. Defaults to 'info'
        })
    }

}
export default (new Logger)