import { LightningElement,track, wire } from 'lwc';
import EXE_BATCH from '@salesforce/apex/BatchApexProgressIndicatorController.executeBatchJob';
import BATCH_STATUS from '@salesforce/apex/BatchApexProgressIndicatorController.getBatchJobStatus';
import { refreshApex } from '@salesforce/apex';
export default class AuraToLWC extends LightningElement {

    @track progress=0;
    @track id
    @track JobItemsProcessed
    @track TotalJobItems
    @track processStatus


       @wire(BATCH_STATUS,{jobID:'$id'})
       accList(result) {
        this.wiredList = result;
    
        if (result.data) {
            this.JobItemsProcessed = result.data.JobItemsProcessed;
            this.TotalJobItems=result.data.TotalJobItems;
            this.processStatus=result.data.Status;
               console.log(' AsyncBatch ',result.data);
               console.log(' AsyncBatch ',result.data.Status);
               this.progressBar();
        } else if (result.error) {
          console.error(result.error);
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

    progressBar() {
        refreshApex(this.wiredList);
        if(this.JobItemsProcessed!=null){

            this.progress=(this.JobItemsProcessed / this.TotalJobItems) * 100;

          }
        
       }
}
