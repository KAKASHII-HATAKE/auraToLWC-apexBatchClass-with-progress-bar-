import { LightningElement,track, wire } from 'lwc';
import EXE_BATCH from '@salesforce/apex/BatchApexProgressIndicatorController.executeBatchJob';
import BATCH_STATUS from '@salesforce/apex/BatchApexProgressIndicatorController.getBatchJobStatus';

export default class AuraToLWC extends LightningElement {

    @track progress=0;
    @track id
    @track JobItemsProcessed
    @track TotalJobItems
    @track processStatus


       @wire(BATCH_STATUS,{jobID:'$id'})
       myData({data,error})
       {
           if(data)
           {
               this.JobItemsProcessed=data.JobItemsProcessed;
               this.TotalJobItems=data.TotalJobItems;
               this.processStatus=data.Status;
               console.log(' AsyncBatch ',data);
               console.log(' AsyncBatch ',data.Status);
           }
           if(error)
           {
               console.error(error);
           }
       }

       async  exeBatch()
       {
        await  EXE_BATCH().then(Response=>{
              this.id=Response;
              console.log('got this response  ',Response);
             // this.progressHandler(Response);
          }).catch(error=>{
              console.log('Error in exeBatch : '+error.body.message);
          })

        }




//     }

//    async progressHandler(res){
//         console.log('progress handler called');
//         console.log('responce id :',this.id);
        
//       await  BATCH_STATUS({jobID:res}).then(response=>{
//             this.TotalJobItems= response.TotalJobItems;
//             this.JobItemsProcessed=response.JobItemsProcessed;
//             if(response.JobItemsProcessed!=null){
//                // this.progress=(response.JobItemsProcessed / response.TotalJobItems) * 100;
//                 this.progressBar();
//             }
            
//             console.log('total job item : ',response.TotalJobItems);
//             console.log('job item processed : ',response.JobItemsProcessed);
//         }).catch(error=>{
//             console.log('Error in progressHandler : '+error.body.message);
//         })
        
//     }

    progressBar() {
        
        this._interval = setInterval(() => {
            this.progress = this.progress + this.JobItemsProcessed;
            this.processStatus = 'Processing => ' + this.progress + ''+this.TotalJobItems;
            if(this.JobItemsProcessed === this.TotalJobItems) {
                clearInterval(this._interval);
                this.processStatus = 'Completed';
            }
            else {
                clearInterval(this._interval);
                this.processStatus = 'Failed';
            }
        }, 300);
}
}
