public with sharing class BatchApexProgressIndicatorController {
    @AuraEnabled(cacheable=true)
    public static Id executeBatchJob(){
        Id batchJobId = Database.executeBatch(new sampleBatchApex(), 1);
        system.debug('batch id '+batchJobId);
        return batchJobId;
    }

    @AuraEnabled(cacheable=true)
    public static AsyncApexJob getBatchJobStatus(id jobID){
        String id=jobID;
        AsyncApexJob jobInfo = [SELECT Status, NumberOfErrors,JobItemsProcessed,TotalJobItems FROM AsyncApexJob WHERE Id =:id];
        system.debug('jobinfo ; '+jobInfo);
        return jobInfo;
    }
}
