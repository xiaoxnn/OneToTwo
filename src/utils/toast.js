
import  Toast from 'react-native-root-toast'

export default  toast={


    showShortCenter(msg){
         this.toast = Toast.show(msg, {
             duration: 1000,
             position: Toast.positions.CENTER,
             backgroundColor:'#06c1ae'
         })
     },
    showShortBottom(msg){
        this.toast = Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            backgroundColor:'#06c1ae'
        })
    },
    showShortTop(msg){
        this.toast = Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.TOP,
            backgroundColor:'#06c1ae'
        })
    }
    ,
    showLongCenter(msg){
        this.toast = Toast.show(msg, {
            duration: 2000,
            position: Toast.positions.CENTER,
            backgroundColor:'#06c1ae'
        })
    },
    showLongBottom(msg){
        this.toast = Toast.show(msg, {
            duration: 2000,
            position: Toast.positions.BOTTOM,
            backgroundColor:'#06c1ae'
        })
    }
    ,
    showLongTop(msg){
        this.toast = Toast.show(msg, {
            duration: 2000,
            position: Toast.positions.TOP,
            backgroundColor:'#06c1ae'
        })
    }
}
