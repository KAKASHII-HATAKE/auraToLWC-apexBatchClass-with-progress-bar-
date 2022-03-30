global with sharing class sampleBatchApex implements Database.Batchable<sObject> {
   // private static String query='Select Id,Name,industry,website,phone from Account';
   // private static String whereClause='where industry=Energy';


    global Database.QueryLocator start(Database.BatchableContext BC){
      String query='Select Id,Name,industry,website,phone from Account where industry=\'Energy\'';
      return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext BC, List<Account> scope){
        
      List<Account> op=new List<Account>();
      if(scope.size()>0){
      for(Account s:scope){
          if(s.Industry=='Energy')
          {
              s.Phone='00000000';
              op.add(s);
          }
      }
    }
      update op;
      
  }
    global void finish(Database.BatchableContext BC){
    }
  }
