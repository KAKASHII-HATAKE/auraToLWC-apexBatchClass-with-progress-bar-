import { LightningElement,track } from 'lwc';
import EXE_BATCH from '@salesforce/apex/BatchApexProgressIndicatorController.executeBatchJob';
import BATCH_STATUS from '@salesforce/apex/BatchApexProgressIndicatorController.getBatchJobStatus';

export default class AuraToLWC extends LightningElement {

    @track progress=0;
    @track id
    JobItemsProcessed
    TotalJobItems
    @track processStatus = 'In Progress';

    


    exeBatch()
    {
       EXE_BATCH().then(Response=>{
           this.id=Response;
           console.log('got this response  ',Response);
           this.progressHandler(Response);
       }).catch(error=>{
           console.log('Error in exeBatch : '+error.body.message);
       })

       
    }

    progressHandler(res){
        console.log('progress handler called');
        console.log('responce id :',this.id);
        
        BATCH_STATUS({jobID:this.id}).then(response=>{
            this.TotalJobItems=response.TotalJobItems;
            this.JobItemsProcessed=response.JobItemsProcessed;
            if(response.JobItemsProcessed!=null){
               // this.progress=(response.JobItemsProcessed / response.TotalJobItems) * 100;
                this.progressBar();
            }
            
            console.log(response.TotalJobItems);
            console.log(response.JobItemsProcessed);
        }).catch(error=>{
            console.log('Error in progressHandler : '+error.body.message);
        })
        
    }

    progressBar() {
        
        this._interval = setInterval(() => {
            this.progress = this.progress + 5;
            this.processStatus = 'Processing => ' + this.progress +'/100';
            if(this.progress === 100) {
                clearInterval(this._interval);
                this.processStatus = 'Completed';
            }
        }, 300);
}
}