import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
// import useExpandCollapse from "./useExpandCollapse";
import useJsonGraph, { type JsonNodeData } from "./useJsonGraph";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JsonNode from "./components/JsonNode";

import useExpandCollapse from "./useExpandCollapse";
import { getLayoutedElements } from "./dagreLayout";

const nodeTypes: NodeTypes = {
  jsonNode: JsonNode,
};

const sampleJson = `
 [
  {
    "name": "inEventName",
    "value": "ContractSubmit"
  },
  {
    "name": "inputContext",
    "value": {
      "decisionRequest": {
        "inputData": {
          "activity": null,
          "applicationDetails": {
            "createdOn": 1744451518377,
            "updatedOn": 1744452812175,
            "ownedOn": null,
            "withdrawReason": null,
            "applicationid": 498595,
            "applicationOrganizationId": 999999,
            "storeNumber": 4655,
            "randomNumber": 6,
            "currentChannel": "TTD",
            "startingChannel": "TTD",
            "subChannel": null,
            "appChannel": null,
            "store": "3181",
            "storeProvince": null,
            "storeTier": null,
            "createdBy": "NokuphiwoNtloko@wfs.co.za",
            "updatedBy": "NokuphiwoNtloko@wfs.co.za",
            "adverseMediaStatus": null,
            "adverseMediaReason": null,
            "agentEscalationCode": null,
            "isAgentEscalation": null,
            "isInternalFraudMatch": true,
            "applicationStatus": "AWAITING_CONTRACT_COMPLETION",
            "decision": null,
            "secondaryCardPersonalIdNumber": null,
            "secondaryCardName": null,
            "secondaryCardPhoneNumber": null,
            "addToFraudFile": null,
            "owningOfficer": null,
            "agreeToFedBox": null,
            "agreedToApprovedTerms": false,
            "agreedToTerms": false,
            "amazonPurchaseAmount": null,
            "apiAppEntryDate": null,
            "applicationCrossReferenceId": null,
            "applicationLanguage": null,
            "applicationNumber": "2025041209498702",
            "applicationStatusHistory": null,
            "applyBuyType": null,
            "approveDecisionCount": null,
            "assessmentID": null,
            "assignDefaultLign": null,
            "benchmarkRate": null,
            "cartValue": null,
            "channel": null,
            "clientDeviceId": null,
            "combinedAssetBalance": null,
            "combinedCurrentDebtToIncomeRatioWithHousing": null,
            "combinedCurrentDebtToIncomeRatioWithoutHousing": null,
            "combinedGrossAnnualIncome": null,
            "combinedHasCheckingAccount": null,
            "combinedHasSavingsAccount": null,
            "combinedLiabilities": null,
            "combinedMonthlyGrossExpense": null,
            "combinedMonthlyGrossIncome": null,
            "combinedMonthlyHousingExpense": null,
            "combinedMonthlyNetIncome": null,
            "combinedMonthlyPayments": null,
            "combinedNetDisposableIncome": null,
            "creditApplicationStatus": null,
            "creditLimit": null,
            "creditLimitCurrency": null,
            "currentLoanToValueRatio": null,
            "customerTenureBucket": null,
            "dMVersion": null,
            "decisionBureauID": null,
            "decisionParty": null,
            "declineDecisionCount": null,
            "declineReasonText": null,
            "defaultLineIncomeSource": null,
            "defaultLineSegment": null,
            "disclosureGroupCd": null,
            "dmOriginalDecision": null,
            "documentVerificationText": null,
            "dupQuery": null,
            "eStatementOverride": null,
            "eStatementPaperless": null,
            "errorMessage": null,
            "exposureLimitSegment": null,
            "externalCorrelationId": null,
            "fraudDecisionCount": null,
            "fusionProductType": null,
            "gANAdvertiserID": null,
            "googleClickID": null,
            "iPAddress": null,
            "id": 498595,
            "identityManagementRegion": null,
            "initialLineSegment": null,
            "instantCredit": null,
            "insuranceIndicator": null,
            "interestPoint": null,
            "investigateDecisionCount": null,
            "isConfirmedDuplicate": null,
            "isConfirmedFraud": null,
            "isEBVSRequired": null,
            "isError": null,
            "isEscalated": null,
            "isExperianPIDRequired": null,
            "isHMDARequired": null,
            "isInBlacklist": null,
            "isInstantCreditApplication": null,
            "isMLxRequired": null,
            "isPossibleDuplicate": null,
            "isPossibleFraud": null,
            "isPreBureauFraud": null,
            "isRVALLetterPresent": null,
            "isReactivation": null,
            "isSeniorLenderFlag": null,
            "isSpecialHandling": null,
            "isVerified": null,
            "lenderAuthority": null,
            "limitTakenAway": null,
            "loanAmount": null,
            "loanOfficerUser": null,
            "loanSource": null,
            "maximumPurchaseAllowance": null,
            "multiApp": null,
            "multiApps": null,
            "offerDetailText": null,
            "oldSourceCode": null,
            "onlineAppEntryDate": null,
            "originalAppID": null,
            "ourCombinedLiabilities": null,
            "ourCombinedMonthlyPayments": null,
            "pOCode": null,
            "partnerReferenceId": null,
            "preferredLanguagecode": null,
            "previousStatus": null,
            "processingProduct": null,
            "productId": null,
            "productOfferCode": null,
            "productSourceCode": null,
            "purchaseHistory": null,
            "receivedDate": null,
            "receivedOn": null,
            "redecisionFlag": null,
            "reevaluationFlag": null,
            "requestedAmount": null,
            "requestedProduct": null,
            "requestedTermInMonths": null,
            "resubmissionFlag": null,
            "reviewRequired": null,
            "secAcqType": null,
            "secondaryReviewLastStep": null,
            "segment": null,
            "skipAttributes": null,
            "statusDateTime": null,
            "strategySelectionRandomNumber": null,
            "strategyVersion": null,
            "subSegment": null,
            "tSYSBalance": null,
            "tSYSCreditCardLimits": null,
            "tSYSTotalExposure": null,
            "totalHousingRatio": null,
            "trustEVResult": null,
            "version": null,
            "versionId": null,
            "storeDescription": null,
            "retryFulfilment": null,
            "productChannel": "TTD",
            "isCounterOffer": true
          },
          "applicationFinancial": null,
          "applicationLock": null,
          "applicationStatusHistory": null,
          "auditDataChange": null,
          "caseReview": null,
          "condition": [
            {
              "partyId": null,
              "applicationId": 498595,
              "offerId": null,
              "documentId": null,
              "category": "FRAUD",
              "code": "IDV",
              "status": "Accepted",
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "reason": null,
              "updatedOn": 1744451754791,
              "createdOn": 1744451754791,
              "customerAction": null,
              "conditionCategory": null,
              "conditionCode": null,
              "conditionCodeText": null,
              "conditionLevel": null,
              "conditionReason": "SYSTEM_APPROVE",
              "conditionRequestReason": null,
              "conditionRequestedBy": null,
              "conditionRequestedOn": null,
              "conditionStatus": null,
              "conditionType": null,
              "conditionUpdatedBy": null,
              "conditionUpdatedOn": null,
              "uploadDocumentId": null
            },
            {
              "partyId": null,
              "applicationId": 498595,
              "offerId": null,
              "documentId": null,
              "category": "CONTRACT",
              "code": "SIGNED_CONTRACT",
              "status": "Accepted",
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "reason": null,
              "updatedOn": 1744452794740,
              "createdOn": 1744451754938,
              "customerAction": null,
              "conditionCategory": null,
              "conditionCode": null,
              "conditionCodeText": null,
              "conditionLevel": null,
              "conditionReason": "SYSTEM_APPROVE",
              "conditionRequestReason": null,
              "conditionRequestedBy": null,
              "conditionRequestedOn": null,
              "conditionStatus": null,
              "conditionType": null,
              "conditionUpdatedBy": null,
              "conditionUpdatedOn": null,
              "uploadDocumentId": null
            },
            {
              "partyId": null,
              "applicationId": 498595,
              "offerId": null,
              "documentId": null,
              "category": "CONTRACT",
              "code": "SIGNED_ROE",
              "status": "Accepted",
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "reason": null,
              "updatedOn": 1744452243259,
              "createdOn": 1744451755055,
              "customerAction": null,
              "conditionCategory": null,
              "conditionCode": null,
              "conditionCodeText": null,
              "conditionLevel": null,
              "conditionReason": "SYSTEM_APPROVE",
              "conditionRequestReason": null,
              "conditionRequestedBy": null,
              "conditionRequestedOn": null,
              "conditionStatus": null,
              "conditionType": null,
              "conditionUpdatedBy": null,
              "conditionUpdatedOn": null,
              "uploadDocumentId": null
            },
            {
              "partyId": null,
              "applicationId": 498595,
              "offerId": null,
              "documentId": null,
              "category": "FICA",
              "code": "FICA_VERIFICATION",
              "status": "Pending",
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "reason": null,
              "updatedOn": 1744451755151,
              "createdOn": 1744451755151,
              "customerAction": null,
              "conditionCategory": null,
              "conditionCode": null,
              "conditionCodeText": null,
              "conditionLevel": null,
              "conditionReason": null,
              "conditionRequestReason": null,
              "conditionRequestedBy": null,
              "conditionRequestedOn": null,
              "conditionStatus": null,
              "conditionType": null,
              "conditionUpdatedBy": null,
              "conditionUpdatedOn": null,
              "uploadDocumentId": null
            },
            {
              "partyId": null,
              "applicationId": 498595,
              "offerId": null,
              "documentId": null,
              "category": "POI",
              "code": "POI_VERIFICATION",
              "status": "Pending",
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "reason": null,
              "updatedOn": 1744452286089,
              "createdOn": 1744452286089,
              "customerAction": null,
              "conditionCategory": null,
              "conditionCode": null,
              "conditionCodeText": null,
              "conditionLevel": null,
              "conditionReason": null,
              "conditionRequestReason": null,
              "conditionRequestedBy": null,
              "conditionRequestedOn": null,
              "conditionStatus": null,
              "conditionType": null,
              "conditionUpdatedBy": null,
              "conditionUpdatedOn": null,
              "uploadDocumentId": null
            },
            {
              "partyId": null,
              "applicationId": 498595,
              "offerId": null,
              "documentId": null,
              "category": "AML",
              "code": "CASA_SCREENING",
              "status": "Accepted",
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "reason": null,
              "updatedOn": 1744452286240,
              "createdOn": 1744452286240,
              "customerAction": null,
              "conditionCategory": null,
              "conditionCode": null,
              "conditionCodeText": null,
              "conditionLevel": null,
              "conditionReason": "SYSTEM_APPROVE",
              "conditionRequestReason": null,
              "conditionRequestedBy": null,
              "conditionRequestedOn": null,
              "conditionStatus": null,
              "conditionType": null,
              "conditionUpdatedBy": null,
              "conditionUpdatedOn": null,
              "uploadDocumentId": null
            }
          ],
          "updatedOn": 1744452811661,
          "createdOn": 1744451518377,
          "document": [
            {
              "dateOfDocument": null,
              "updatedOn": null,
              "createdOn": null,
              "conditionId": null,
              "applicationId": 498595,
              "id": 248141,
              "externalId": null,
              "code": "CONTRACT",
              "fileName": "6407290763086_CONTRACT",
              "status": null,
              "type": "CONTRACT",
              "documentBase64": null,
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": null,
              "documentGeneration": null,
              "documentId": null,
              "name": null,
              "partyId": null
            },
            {
              "dateOfDocument": null,
              "updatedOn": null,
              "createdOn": null,
              "conditionId": null,
              "applicationId": null,
              "id": 248140,
              "externalId": null,
              "code": "TERMS_CONDITIONS",
              "fileName": "ROE.pdf",
              "status": null,
              "type": "CONTRACT",
              "documentBase64": null,
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": null,
              "documentGeneration": null,
              "documentId": null,
              "name": null,
              "partyId": null
            },
            {
              "dateOfDocument": null,
              "updatedOn": null,
              "createdOn": null,
              "conditionId": null,
              "applicationId": null,
              "id": 248157,
              "externalId": null,
              "code": "CONTRACT",
              "fileName": "CONTRACT.pdf",
              "status": null,
              "type": "CONTRACT",
              "documentBase64": null,
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": null,
              "documentGeneration": null,
              "documentId": null,
              "name": null,
              "partyId": null
            }
          ],
          "creditApplicationRequest": {
            "id": null,
            "productTypeId": null,
            "applicationProductId": null,
            "offerId": null,
            "requestedTermInMonths": null,
            "updatedBy": null,
            "createdBy": null,
            "updatedOn": null,
            "createdOn": null,
            "requestedAmount": null,
            "requestedProduct": "CARD",
            "requestedinterestRate": null,
            "requestedMonthlyPayment": null,
            "creditApplicationRequestCreditDetail": null
          },
          "applicationProduct": [
            {
              "id": null,
              "applicationId": 498595,
              "productId": null,
              "updatedBy": null,
              "createdBy": null,
              "productName": "CREDIT_CARD",
              "userDefinedFields": null,
              "updatedOn": null,
              "createdOn": null,
              "code": null,
              "interestRate": null,
              "monthlyPayment": null,
              "name": null,
              "requestedAmount": null,
              "requestedTermInMonths": null
            },
            {
              "id": null,
              "applicationId": 498595,
              "productId": null,
              "updatedBy": null,
              "createdBy": null,
              "productName": "STORE_CARD",
              "userDefinedFields": null,
              "updatedOn": null,
              "createdOn": null,
              "code": null,
              "interestRate": null,
              "monthlyPayment": null,
              "name": null,
              "requestedAmount": null,
              "requestedTermInMonths": null
            },
            {
              "id": null,
              "applicationId": 498595,
              "productId": null,
              "updatedBy": null,
              "createdBy": null,
              "productName": "PERSONAL_LOAN",
              "userDefinedFields": null,
              "updatedOn": null,
              "createdOn": null,
              "code": null,
              "interestRate": null,
              "monthlyPayment": null,
              "name": null,
              "requestedAmount": null,
              "requestedTermInMonths": null
            }
          ],
          "promotion": null,
          "error": null,
          "id": 498595,
          "version": null,
          "note": [],
          "offer": [
            {
              "isSelected": false,
              "isAvailable": false,
              "isInitiationFeeUpfront": false,
              "initiationFeeUpfront": null,
              "amount": 1000,
              "monthlyPayment": 162.47,
              "totalOfAllInstalments": 1949.69,
              "interestRate": 0.2175,
              "condition": null,
              "term": 12,
              "applicationProductId": "PERSONAL_LOAN",
              "creditApplicationRequestId": null,
              "initiationFee": null,
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "additionalBenefits": null,
              "fulfilmentMethod": null,
              "defaultNotice": null,
              "accountStatementLanguage": null,
              "productSubType": "Revolving Loan",
              "cancellationReason": null,
              "rate": null,
              "debtToIncome": null,
              "deliveryCharge": null,
              "fees": [
                {
                  "amount": 69,
                  "type": "Service"
                },
                {
                  "amount": 172.5,
                  "type": "Initiation"
                }
              ],
              "insuranceOption": [
                {
                  "premium": 4.5,
                  "maxAge": 64,
                  "minAge": 18,
                  "type": "Comprehensive Cover",
                  "isSelected": null,
                  "frequency": "Monthly"
                }
              ],
              "limit": 1000,
              "poiAdditionalIncomeRequired": null,
              "poiIncomeThreshold": 2300,
              "pctID": "PNH",
              "isPOIRequired": true,
              "debitOrderRequired": "Y",
              "updatedOn": 1744416000000,
              "createdOn": null,
              "monthlyInstalmentWithOptions": 166.97,
              "totalInterest": 121.69,
              "totalInterestAndFees": 949.69,
              "creditCostMultiple": 2.9,
              "insuranceTotalMonthlyPremium": 4.5,
              "insuranceBalanceProtection": 4.5,
              "statementDeliveryMethod": null,
              "initialLimit": null,
              "initialAmount": null,
              "isOfferUpdated": null,
              "isAppealable": null,
              "approvedAmount": null,
              "assignedAmount": null,
              "cashAdvanceLimit": null,
              "cashAdvancePercent": null,
              "id": "776479",
              "offerProduct": null,
              "product": null,
              "productId": null,
              "rawAmount": null,
              "logo": 11,
              "applicationProductIdDescription": null,
              "insuranceAdminFee": 0.78
            },
            {
              "isSelected": false,
              "isAvailable": false,
              "isInitiationFeeUpfront": false,
              "initiationFeeUpfront": null,
              "amount": 1700,
              "monthlyPayment": 223.91,
              "totalOfAllInstalments": 2686.87,
              "interestRate": 0.2175,
              "condition": null,
              "term": 12,
              "applicationProductId": "CREDIT_CARD",
              "creditApplicationRequestId": null,
              "initiationFee": null,
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "additionalBenefits": null,
              "fulfilmentMethod": null,
              "defaultNotice": null,
              "accountStatementLanguage": null,
              "productSubType": "Gold",
              "cancellationReason": null,
              "rate": null,
              "debtToIncome": null,
              "deliveryCharge": null,
              "fees": [
                {
                  "amount": 199,
                  "type": "Initiation"
                },
                {
                  "amount": 65,
                  "type": "Monthly"
                },
                {
                  "amount": 180,
                  "type": "FaceToFaceDelivery"
                }
              ],
              "insuranceOption": [
                {
                  "premium": 5.5,
                  "maxAge": 64,
                  "minAge": 18,
                  "type": "Comprehensive Cover|CB1",
                  "isSelected": null,
                  "frequency": "Monthly"
                }
              ],
              "limit": 1700,
              "poiAdditionalIncomeRequired": null,
              "poiIncomeThreshold": 2300,
              "pctID": null,
              "isPOIRequired": true,
              "debitOrderRequired": "Y",
              "updatedOn": 1744416000000,
              "createdOn": null,
              "monthlyInstalmentWithOptions": 233.26,
              "totalInterest": 206.87,
              "totalInterestAndFees": 986.87,
              "creditCostMultiple": 2.16,
              "insuranceTotalMonthlyPremium": 9.35,
              "insuranceBalanceProtection": 9.35,
              "statementDeliveryMethod": null,
              "initialLimit": null,
              "initialAmount": null,
              "isOfferUpdated": null,
              "isAppealable": null,
              "approvedAmount": null,
              "assignedAmount": null,
              "cashAdvanceLimit": null,
              "cashAdvancePercent": null,
              "id": "776481",
              "offerProduct": null,
              "product": null,
              "productId": null,
              "rawAmount": null,
              "logo": 20,
              "applicationProductIdDescription": null,
              "insuranceAdminFee": 1.61
            },
            {
              "isSelected": true,
              "isAvailable": true,
              "isInitiationFeeUpfront": true,
              "initiationFeeUpfront": "UP_FRONT",
              "amount": 4500,
              "monthlyPayment": 468.13,
              "totalOfAllInstalments": 5617.6,
              "interestRate": 0.2175,
              "condition": null,
              "term": 12,
              "applicationProductId": "STORE_CARD",
              "creditApplicationRequestId": null,
              "initiationFee": null,
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "additionalBenefits": null,
              "fulfilmentMethod": null,
              "defaultNotice": "Hand Delivery (Residential address)",
              "accountStatementLanguage": "ENGLISH",
              "productSubType": "Customer",
              "cancellationReason": null,
              "rate": null,
              "debtToIncome": null,
              "deliveryCharge": null,
              "fees": [
                {
                  "amount": 100,
                  "type": "Initiation"
                },
                {
                  "amount": 47.5,
                  "type": "Monthly"
                }
              ],
              "insuranceOption": [
                {
                  "premium": 5.5,
                  "maxAge": 64,
                  "minAge": 18,
                  "type": "Comprehensive Cover",
                  "isSelected": false,
                  "frequency": "Monthly"
                }
              ],
              "limit": 4500,
              "poiAdditionalIncomeRequired": null,
              "poiIncomeThreshold": 2300,
              "pctID": "NSL",
              "isPOIRequired": true,
              "debitOrderRequired": "N",
              "updatedOn": 1744416000000,
              "createdOn": null,
              "monthlyInstalmentWithOptions": 468.13,
              "totalInterest": 547.6,
              "totalInterestAndFees": 1217.6,
              "creditCostMultiple": 1.52,
              "insuranceTotalMonthlyPremium": 0,
              "insuranceBalanceProtection": 0,
              "statementDeliveryMethod": "ONEAPP",
              "initialLimit": null,
              "initialAmount": null,
              "isOfferUpdated": null,
              "isAppealable": null,
              "approvedAmount": null,
              "assignedAmount": null,
              "cashAdvanceLimit": null,
              "cashAdvancePercent": null,
              "id": "776482",
              "offerProduct": null,
              "product": null,
              "productId": null,
              "rawAmount": null,
              "logo": 1,
              "applicationProductIdDescription": null,
              "insuranceAdminFee": 0
            },
            {
              "isSelected": false,
              "isAvailable": false,
              "isInitiationFeeUpfront": false,
              "initiationFeeUpfront": null,
              "amount": 1000,
              "monthlyPayment": 120.75,
              "totalOfAllInstalments": 2898.11,
              "interestRate": 0.2175,
              "condition": null,
              "term": 24,
              "applicationProductId": "PERSONAL_LOAN",
              "creditApplicationRequestId": null,
              "initiationFee": null,
              "updatedBy": "NokuphiwoNtloko@wfs.co.za",
              "createdBy": "NokuphiwoNtloko@wfs.co.za",
              "additionalBenefits": null,
              "fulfilmentMethod": null,
              "defaultNotice": null,
              "accountStatementLanguage": null,
              "productSubType": "Revolving Loan",
              "cancellationReason": null,
              "rate": null,
              "debtToIncome": null,
              "deliveryCharge": null,
              "fees": [
                {
                  "amount": 69,
                  "type": "Service"
                },
                {
                  "amount": 172.5,
                  "type": "Initiation"
                }
              ],
              "insuranceOption": [
                {
                  "premium": 4.5,
                  "maxAge": 64,
                  "minAge": 18,
                  "type": "Comprehensive Cover",
                  "isSelected": null,
                  "frequency": "Monthly"
                }
              ],
              "limit": 1000,
              "poiAdditionalIncomeRequired": null,
              "poiIncomeThreshold": 2300,
              "pctID": "PNH",
              "isPOIRequired": true,
              "debitOrderRequired": "Y",
              "updatedOn": 1744416000000,
              "createdOn": null,
              "monthlyInstalmentWithOptions": 125.25,
              "totalInterest": 1070.11,
              "totalInterestAndFees": 1898.11,
              "creditCostMultiple": 4.8,
              "insuranceTotalMonthlyPremium": 4.5,
              "insuranceBalanceProtection": 4.5,
              "statementDeliveryMethod": null,
              "initialLimit": null,
              "initialAmount": null,
              "isOfferUpdated": null,
              "isAppealable": null,
              "approvedAmount": null,
              "assignedAmount": null,
              "cashAdvanceLimit": null,
              "cashAdvancePercent": null,
              "id": "776480",
              "offerProduct": null,
              "product": null,
              "productId": null,
              "rawAmount": null,
              "logo": 11,
              "applicationProductIdDescription": null,
              "insuranceAdminFee": 0.78
            }
          ],
          "fraudFileMatch": [
            {
              "fraudFileMatchId": null,
              "fraudFileRecordId": null,
              "identificationNumberMatch": false,
              "employerNameMatch": true,
              "employerTelephoneMatch": null,
              "emailAddressMatch": false,
              "iPAddressMatch": null,
              "riskIndicatorMatch": null,
              "telephoneWorkMatch": false,
              "homeAddressLine1Match": false,
              "homeAddressLine2Match": false,
              "homeAddressLine3Match": false,
              "telephoneHomeMatch": false,
              "postalAddressLine1Match": false,
              "postalAddressLine2Match": false,
              "postalAddressLine3Match": false,
              "telephoneRelativeCellMatch": null,
              "telephoneRelativeWorkMatch": null,
              "telephoneRelativeHomeMatch": null,
              "telephoneCellMatch": false,
              "orgMatch": null,
              "bankAccountNumberMatch": false,
              "storeNumberMatch": false
            }
          ],
          "contract": [
            {
              "contractConfirmationType": "PHYSICAL_ARTIFACT",
              "contractUserDateTime": null,
              "roeConfirmationType": "PHYSICAL_ARTIFACT",
              "deliveryChannelContract": "POST",
              "deliveryChannelTandC": null,
              "roeUserDateTime": null,
              "xdsCustomerVerified": null
            }
          ],
          "party": [
            {
              "createRewardsCardData": null,
              "partyRelationship": null,
              "person": {
                "isIDVerified": true,
                "debtCounsellingInd": 0,
                "isSpousalConstent": false,
                "dateOfBirth": -171244800000,
                "passportNumber": null,
                "passportExpiryDate": null,
                "identification": [
                  {
                    "expiryDate": null,
                    "issuedDate": null,
                    "partyId": null,
                    "placeIssued": null,
                    "reference": null,
                    "type": "OM_CUSTREF_IDCRD",
                    "updatedBy": null,
                    "createdBy": null,
                    "updatedOn": null,
                    "createdOn": null,
                    "issueDate": null
                  }
                ],
                "personFinancial": {
                  "income": null,
                  "expense": [
                    {
                      "paymentAmount": 0,
                      "type": "MORTGAGE",
                      "paymentFrequency": "Monthly",
                      "paymentCurrency": "ZAR"
                    },
                    {
                      "paymentAmount": 0,
                      "type": "RENT",
                      "paymentFrequency": "Monthly",
                      "paymentCurrency": "ZAR"
                    },
                    {
                      "paymentAmount": 0,
                      "type": "MAINTENANCE",
                      "paymentFrequency": "Monthly",
                      "paymentCurrency": "ZAR"
                    },
                    {
                      "paymentAmount": 400,
                      "type": "CREDIT",
                      "paymentFrequency": "Monthly",
                      "paymentCurrency": "ZAR"
                    },
                    {
                      "paymentAmount": 500,
                      "type": "OTHER",
                      "paymentFrequency": "Monthly",
                      "paymentCurrency": "ZAR"
                    }
                  ],
                  "liability": null,
                  "bankingDetail": [
                    {
                      "isSalary": null,
                      "isBankAccountVerified": null,
                      "isDEAActive": null,
                      "isDEAConsent": false,
                      "isDebitOrder": null,
                      "debitOrderDate": null,
                      "branchCode": null,
                      "branchName": "",
                      "bankAccountNumber": null,
                      "bankName": null,
                      "bankAccountType": null,
                      "bankAccountAge": null,
                      "debitOrderDay": null,
                      "debitOrderAmount": null
                    }
                  ],
                  "totalLiabilitiesCurrency": null,
                  "totalMonthlyIncomeCurrency": null,
                  "totalAssetsCurrency": null,
                  "updatedBy": null,
                  "createdBy": null,
                  "homeOwnerStatus": "OWN",
                  "currentDebtToIncomeRatio": null,
                  "netMonthlyIncome": 2300,
                  "totalAnnualIncome": null,
                  "totalLiabilities": null,
                  "totalMonthlyGrossIncome": 2300,
                  "totalLiabilityMonthlyPayments": null,
                  "totalAssets": null,
                  "totalMonthlyHouseExpense": null,
                  "updatedOn": null,
                  "sourceOfFunds": "135",
                  "createdOn": null,
                  "poiSaveIncomeStatus": null,
                  "totalMonthlyAdditionalIncome": 0
                },
                "employment": [
                  {
                    "isCurrent": null,
                    "isPaySlipReceived": null,
                    "isWoolworthsStaff": false,
                    "personId": null,
                    "incomeId": null,
                    "addressId": null,
                    "status": "PENSIONER",
                    "contractType": null,
                    "employerName": "PENSIONER",
                    "sector": "INDUSTRY",
                    "jobTitle": "PENSIONER",
                    "updatedBy": null,
                    "createdBy": null,
                    "occupation": "OTHER",
                    "selfEmploymentType": null,
                    "startDate": null,
                    "endDate": null,
                    "updatedOn": null,
                    "createdOn": null,
                    "additionalAnnualIncome": null,
                    "additionalIncomeFrequency": null,
                    "additionalIncomeSource": null,
                    "annualSalary": null,
                    "employerPhone": null,
                    "employmentStatus": null,
                    "incomeFrequency": null,
                    "industry": "INDUSTRY",
                    "jobCode": null,
                    "monthsWithEmployer": null,
                    "natureOfBusiness": null,
                    "oDSMDMEmploymentStatus": null,
                    "position": null,
                    "totalHouseholdIncome": null,
                    "type": null,
                    "yearsWithEmployer": null
                  }
                ],
                "monthsWithCurrentEmployer": null,
                "numberOfDependants": 0,
                "firstName": "BERTHA OUMAKIE",
                "lastName": "TSHELWANE",
                "middleName": null,
                "personalIdNumber": "6407290763086",
                "gender": "F",
                "maritalStatus": "SINGLE",
                "prefix": "MS",
                "residentialStatus": null,
                "employmentStatus": null,
                "updatedBy": null,
                "createdBy": null,
                "nationality": "ZA",
                "verificationType": "MANUAL_ID_REVIEW",
                "preferredLanguage": "ENGLISH",
                "countryOfResidence": "ZA",
                "countryOfBirth": "ZA",
                "isIdVerifiedFulfillment": null,
                "isIdDocumentUploadedFulfillment": null,
                "verificationReferenceFulfillment": "",
                "verificationTypeFulfillment": null,
                "preferredMarketingChannel": "SMS",
                "isExistingCustomer": null,
                "customerAge": 60,
                "updatedOn": null,
                "createdOn": null,
                "accessCode": null,
                "age": 60,
                "applicantCondition": null,
                "applicantType": null,
                "cdnResident": null,
                "codsId": null,
                "email": null,
                "emailOptIn": null,
                "id": null,
                "isOurEmployee": null,
                "monthsAtCurrentAddress": null,
                "monthsWithCurrentEmployement": null,
                "motherMaidenName": null,
                "phone": null,
                "preferredCommunication": null,
                "preferredFirstName": null,
                "preferredGender": null,
                "preferredHonorific": null,
                "preferredLastName": null,
                "primaryCommunication": null,
                "pronoun": null,
                "referenceApplicationNumber": null,
                "secondaryCommunication": null,
                "suffix": null,
                "surname": "TSHELWANE",
                "prefixDescription": null
              },
              "phone": [
                {
                  "isPrimary": false,
                  "id": null,
                  "partyId": null,
                  "number": "0604834903",
                  "type": "CELLPHONE",
                  "countryCode": null,
                  "updatedBy": null,
                  "createdBy": null,
                  "updatedOn": null,
                  "createdOn": null,
                  "phoneSource": null,
                  "phoneType": null
                },
                {
                  "isPrimary": true,
                  "id": null,
                  "partyId": null,
                  "number": "0632073702",
                  "type": "CELLPHONE",
                  "countryCode": null,
                  "updatedBy": null,
                  "createdBy": null,
                  "updatedOn": null,
                  "createdOn": null,
                  "phoneSource": null,
                  "phoneType": null
                }
              ],
              "email": null,
              "address": [
                {
                  "updatedOn": null,
                  "createdOn": null,
                  "id": null,
                  "partyId": null,
                  "addressMonths": null,
                  "addressYears": null,
                  "line1": "NO E1695",
                  "line2": "MASOSOSBANE",
                  "country": null,
                  "postalCode": "0335",
                  "suburb": "PHOKENG",
                  "addressType": "RESIDENTIAL",
                  "city": "RUSTENBURG",
                  "province": "North West",
                  "updatedBy": null,
                  "postalAddressType": null,
                  "createdBy": null,
                  "addressDifferFlag": null,
                  "addressResidenceType": null,
                  "county": null,
                  "homeValue": null,
                  "housingStatus": null,
                  "monthlyPayment": null,
                  "postcode": null,
                  "state": null,
                  "provinceDescription": null
                },
                {
                  "updatedOn": null,
                  "createdOn": null,
                  "id": null,
                  "partyId": null,
                  "addressMonths": null,
                  "addressYears": null,
                  "line1": "NO E1695",
                  "line2": "MASOSOSBANE",
                  "country": null,
                  "postalCode": "0335",
                  "suburb": "PHOKENG",
                  "addressType": "POSTAL",
                  "city": "RUSTENBURG",
                  "province": "North West",
                  "updatedBy": null,
                  "postalAddressType": "STREET_ADDRESS",
                  "createdBy": null,
                  "addressDifferFlag": null,
                  "addressResidenceType": null,
                  "county": null,
                  "homeValue": null,
                  "housingStatus": null,
                  "monthlyPayment": null,
                  "postcode": null,
                  "state": null,
                  "provinceDescription": null
                }
              ],
              "bureauReport": null,
              "customerData": null,
              "previousApplication": null,
              "condition": null,
              "note": null,
              "document": null,
              "consent": {
                "isEmailConsent": null,
                "isAgreedROE": null,
                "isPhoneConsent": null,
                "isSMSConsent": null,
                "isTermsConsent": null,
                "isBureauConsent": true,
                "isPersonalInformationConsent": null,
                "isMarketingConsent": null,
                "isAutoCreditLimitIncrease": true,
                "isPayByDebitOrder": false,
                "isRewardsOptIn": true,
                "isBalanceProtection": false,
                "isMarketingWFS": true,
                "isMarketingWoolworths": true,
                "isCreditHistory": true,
                "isAgreeContract": true,
                "isConfirmation": true,
                "isReadTandC": true
              },
              "itcData": {
                "status": "SUCCESS",
                "timestamp": 1744451528445,
                "itcResponse": {
                  "submitResponse": {
                    "submitResult": {
                      "status": "SUCCESS",
                      "errorCode": null,
                      "applicationID": "20250412EE3XFCNQIV",
                      "consumerNumber": "",
                      "bccFilter1": 0,
                      "bccFilter2": 0,
                      "bccFilter3": 0,
                      "bccFilter4": 0,
                      "empiricaScore": 589,
                      "empiricaExclusionCode": "",
                      "empiricaIndicator": false,
                      "bccIndicator": 0,
                      "bccScore": 0,
                      "outcome": "Decline",
                      "reason": "Empirica Rule False",
                      "bureauData": {
                        "responseStatus": "Success",
                        "errorCode": null,
                        "errorMessage": null,
                        "processingStartDate": 1744451526798,
                        "processingTimeSecs": 0.4532034,
                        "uniqueRefGuid": "cce1f2e9-4243-4bb9-a6d9-c5142cd5a2bd",
                        "addressVerificationNR01": null,
                        "akaNamesNK04": null,
                        "bccBC04": {
                          "consumerNo": "583826220",
                          "bCCs": {
                            "bCC04": [
                              {
                                "name": "DM001AL",
                                "value": "+000000060"
                              },
                              {
                                "name": "DM002AL",
                                "value": "F"
                              },
                              {
                                "name": "DM003AL",
                                "value": "N"
                              },
                              {
                                "name": "DM004AL",
                                "value": "+000000299"
                              },
                              {
                                "name": "DM005AL",
                                "value": "-000000004"
                              },
                              {
                                "name": "DM006AL",
                                "value": "-000000004"
                              },
                              {
                                "name": "DM007AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "EQ001AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "EQ001CL",
                                "value": "+000000000"
                              },
                              {
                                "name": "EQ001FN",
                                "value": "+000000000"
                              },
                              {
                                "name": "EQ002AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "EQ002CL",
                                "value": "-000000001"
                              },
                              {
                                "name": "EQ002FC",
                                "value": "-000000001"
                              },
                              {
                                "name": "EQ002NL",
                                "value": "-000000001"
                              },
                              {
                                "name": "EQ003CL",
                                "value": "-000000001"
                              },
                              {
                                "name": "EQ003FN",
                                "value": "-000000001"
                              },
                              {
                                "name": "EQ004AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "EQ004CL",
                                "value": "-000000001"
                              },
                              {
                                "name": "EQ004FC",
                                "value": "-000000001"
                              },
                              {
                                "name": "EQ004NL",
                                "value": "-000000001"
                              },
                              {
                                "name": "EQ007AL",
                                "value": "+000000012"
                              },
                              {
                                "name": "EQ008AL",
                                "value": "+000000012"
                              },
                              {
                                "name": "EQ008CL",
                                "value": "-000000001"
                              },
                              {
                                "name": "EQ008FC",
                                "value": "-000000001"
                              },
                              {
                                "name": "NG001AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "NG004AL",
                                "value": "-000000002"
                              },
                              {
                                "name": "NG008AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "NG011AL",
                                "value": "-000000002"
                              },
                              {
                                "name": "NG022AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "NG034AL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP001AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP001CC",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP001CL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP001FC",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP001FL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP001NL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP001PL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP002AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP002FC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP003AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP005AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP005CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP005FL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP005PL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP006AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP007AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP007NL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP008AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP008NL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP009NL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP013AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP014AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP017CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP020AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP027AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP027CL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP032CL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP033AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP033CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP034AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP035CL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP040CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP044AL",
                                "value": "+000000001"
                              },
                              {
                                "name": "PP044FC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP044NL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP045AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP045FL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP046CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP050AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP050CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP051AL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP051CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP052AL",
                                "value": "-000000003"
                              },
                              {
                                "name": "PP053AL",
                                "value": "-000000003"
                              },
                              {
                                "name": "PP058AL",
                                "value": "+000000012"
                              },
                              {
                                "name": "PP058CL",
                                "value": "+000000012"
                              },
                              {
                                "name": "PP058NL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP059AL",
                                "value": "+000000008"
                              },
                              {
                                "name": "PP059FC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP060AL",
                                "value": "-000000003"
                              },
                              {
                                "name": "PP060CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP060CL",
                                "value": "-000000003"
                              },
                              {
                                "name": "PP061AL",
                                "value": "-000000003"
                              },
                              {
                                "name": "PP066AL",
                                "value": "+000000012"
                              },
                              {
                                "name": "PP067AL",
                                "value": "+000000012"
                              },
                              {
                                "name": "PP068AL",
                                "value": "+000000012"
                              },
                              {
                                "name": "PP068CL",
                                "value": "+000000012"
                              },
                              {
                                "name": "PP069AL",
                                "value": "+000000012"
                              },
                              {
                                "name": "PP069CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP069NL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP070AL",
                                "value": "+000000054"
                              },
                              {
                                "name": "PP070CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP070CL",
                                "value": "+000000054"
                              },
                              {
                                "name": "PP070FC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP070NL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP071AL",
                                "value": "+000000385"
                              },
                              {
                                "name": "PP072CC",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP074AL",
                                "value": "-000000005"
                              },
                              {
                                "name": "PP078CL",
                                "value": "+000007050"
                              },
                              {
                                "name": "PP079AL",
                                "value": "-000000005"
                              },
                              {
                                "name": "PP081CL",
                                "value": "+000007050"
                              },
                              {
                                "name": "PP082NL",
                                "value": "-000000002"
                              },
                              {
                                "name": "PP100CL",
                                "value": "+000000000"
                              },
                              {
                                "name": "PP104CL",
                                "value": "+000000000"
                              }
                            ]
                          }
                        },
                        "bccB701": {
                          "consumerNo": "583826220",
                          "bCCs": {
                            "bC7_01": [
                              {
                                "name": "DM0004AL",
                                "value": "-000000004.0"
                              },
                              {
                                "name": "DM0005AL",
                                "value": "1"
                              },
                              {
                                "name": "DM0011AL",
                                "value": "0"
                              },
                              {
                                "name": "DM0102AL",
                                "value": "0299017"
                              },
                              {
                                "name": "DM0401AL",
                                "value": "+000000269.0"
                              },
                              {
                                "name": "DM0404AL",
                                "value": "+000000004.0"
                              },
                              {
                                "name": "DM0801AL",
                                "value": "0"
                              },
                              {
                                "name": "DM0802AL",
                                "value": "0"
                              },
                              {
                                "name": "DP0001AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "DP0003AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0111AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0112AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0113AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0301AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0304AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0307AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0401AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0403AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0501AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0601AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0701AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "DP0801AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "JN0001AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "JN0003AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "JN0113AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "JN0265AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "JN0307AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "JN0401AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "JN0501AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "JN0601AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "JN0701AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "JN0801AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "NG0001AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "NG0004AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "NG0024AL",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "NG0025AL",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "NG0401AL",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "NG0801AL",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "NG2001AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "NG2002AL",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "NG2027AL",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "NG2401AL",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "NG2801AL",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "NG3001AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "NG3002AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "NG3003AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0001CL",
                                "value": "+000000001.0"
                              },
                              {
                                "name": "PP0014CL",
                                "value": "+000000001.0"
                              },
                              {
                                "name": "PP0015AL",
                                "value": "-000000010.0"
                              },
                              {
                                "name": "PP0015CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0015CL",
                                "value": "-000000010.0"
                              },
                              {
                                "name": "PP0016AL",
                                "value": "-000000010.0"
                              },
                              {
                                "name": "PP0024CL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0024FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0025CL",
                                "value": "+000000001.0"
                              },
                              {
                                "name": "PP0031AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0033CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0033CL",
                                "value": "+000000001.0"
                              },
                              {
                                "name": "PP0033FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0054AL",
                                "value": "+000000001.0"
                              },
                              {
                                "name": "PP0055AL",
                                "value": "-000000007.0"
                              },
                              {
                                "name": "PP0055TE",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0057AL",
                                "value": "-000000007.0"
                              },
                              {
                                "name": "PP0057CL",
                                "value": "-000000007.0"
                              },
                              {
                                "name": "PP0102AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0102CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0102CL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0102LB",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0102LN",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0102RR",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0103AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0103CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0103CL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0111CL",
                                "value": "+000000001.0"
                              },
                              {
                                "name": "PP0115AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0133FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0135CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0141FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0145AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0145LB",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0151CL",
                                "value": "+000000001.0"
                              },
                              {
                                "name": "PP0155FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0174FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0175LO",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0203AL",
                                "value": "+000000003.0"
                              },
                              {
                                "name": "PP0205CL",
                                "value": "+000000012.0"
                              },
                              {
                                "name": "PP0205TE",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0301AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0305AL",
                                "value": "+000000001.0"
                              },
                              {
                                "name": "PP0311FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0315AL",
                                "value": "+000000001.0"
                              },
                              {
                                "name": "PP0323AL",
                                "value": "-000000007.0"
                              },
                              {
                                "name": "PP0327LB",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0401AL",
                                "value": "+000000011.0"
                              },
                              {
                                "name": "PP0401CL",
                                "value": "+000000011.0"
                              },
                              {
                                "name": "PP0403AL",
                                "value": "+000000347.0"
                              },
                              {
                                "name": "PP0403CL",
                                "value": "+000000347.0"
                              },
                              {
                                "name": "PP0404AL",
                                "value": "+000000011.0"
                              },
                              {
                                "name": "PP0404RR",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0407AL",
                                "value": "+000000011.0"
                              },
                              {
                                "name": "PP0407CL",
                                "value": "+000000011.0"
                              },
                              {
                                "name": "PP0407FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0421AL",
                                "value": "+000000011.0"
                              },
                              {
                                "name": "PP0421CL",
                                "value": "+000000011.0"
                              },
                              {
                                "name": "PP0427CL",
                                "value": "+000000011.0"
                              },
                              {
                                "name": "PP0427TE",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0432FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0433FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0515CL",
                                "value": "+000007050.0"
                              },
                              {
                                "name": "PP0534CL",
                                "value": "+000007050.0"
                              },
                              {
                                "name": "PP0535AL",
                                "value": "+000007050.0"
                              },
                              {
                                "name": "PP0544AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0544CL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0545CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0614CL",
                                "value": "-000000007.0"
                              },
                              {
                                "name": "PP0615LN",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0643CL",
                                "value": "+000000111.0"
                              },
                              {
                                "name": "PP0644AL",
                                "value": "+000000326.0"
                              },
                              {
                                "name": "PP0645AL",
                                "value": "-000000010.0"
                              },
                              {
                                "name": "PP0701AL",
                                "value": "+000000385.0"
                              },
                              {
                                "name": "PP0701OD",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0703FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0705CL",
                                "value": "-000000010.0"
                              },
                              {
                                "name": "PP0714AL",
                                "value": "-000000007.0"
                              },
                              {
                                "name": "PP0715CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0715CL",
                                "value": "+000000385.0"
                              },
                              {
                                "name": "PP0721AL",
                                "value": "+000000385.0"
                              },
                              {
                                "name": "PP0734AL",
                                "value": "+000000353.0"
                              },
                              {
                                "name": "PP0734CL",
                                "value": "+000000353.0"
                              },
                              {
                                "name": "PP0734IN",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0744AL",
                                "value": "+000000022.0"
                              },
                              {
                                "name": "PP0781FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0782FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0803AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0804AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0816AL",
                                "value": "-000000003.0"
                              },
                              {
                                "name": "PP0901AL",
                                "value": "+000000054.0"
                              },
                              {
                                "name": "PP0901CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0903CL",
                                "value": "+000000055.0"
                              },
                              {
                                "name": "PP0904FS",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0905CL",
                                "value": "-000000010.0"
                              },
                              {
                                "name": "PP0914AL",
                                "value": "-000000007.0"
                              },
                              {
                                "name": "PP0914CL",
                                "value": "-000000007.0"
                              },
                              {
                                "name": "PP0915AL",
                                "value": "+000000054.0"
                              },
                              {
                                "name": "PP0915CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0915CL",
                                "value": "+000000054.0"
                              },
                              {
                                "name": "PP0921AL",
                                "value": "+000000054.0"
                              },
                              {
                                "name": "PP0933AL",
                                "value": "+000000052.0"
                              },
                              {
                                "name": "PP0934BL",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0934CC",
                                "value": "-000000002.0"
                              },
                              {
                                "name": "PP0935CL",
                                "value": "+000000040.0"
                              },
                              {
                                "name": "PP0944AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0944CL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "PP0945AL",
                                "value": "-000000010.0"
                              },
                              {
                                "name": "SP0001AL",
                                "value": "+000000000.0"
                              },
                              {
                                "name": "SP0003AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "SP0113AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "SP0307AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "SP0501AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "SP0601AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "SP0701AL",
                                "value": "-000000001.0"
                              },
                              {
                                "name": "SP0801AL",
                                "value": "-000000001.0"
                              }
                            ]
                          }
                        },
                        "ccaSummaryMX01": {
                          "consumerNo": 583826220,
                          "totalActiveAccounts": 1,
                          "totalClosedAccounts24Mths": 0,
                          "totalAdverseAccounts24Mths": 0,
                          "highestActualMonths24Mths": 0,
                          "noRevolvingAccounts": 1,
                          "noCurrentInstallmentAccounts": 0,
                          "noCurrentOpenAccounts": 0,
                          "currentBalance": 3790,
                          "currentBalanceInd": null,
                          "currentMonthlyInstallment": 385,
                          "currentMonthlyInstallmentBalInd": null,
                          "cumulativeArrearsAmount": 0,
                          "cumulativeArrearsAmountBalanceInd": null
                        },
                        "consEnqTransInfo0102": {
                          "definiteMatchCount": "1",
                          "possibleMatchCount": "00",
                          "matchedConsumerNo": "583826220",
                          "possibleConsumerNo": null,
                          "possibleAdverseIndicator": null
                        },
                        "consumerCountersNC04": {
                          "consumerNo": "583826220",
                          "ownEnquiries1YrBack": 1,
                          "ownEnquiries2YrsBack": 0,
                          "ownEnquiriesMoreThen2YrsBack": 0,
                          "otherEnquiries1YrBack": 1,
                          "otherEnquiries2YrsBack": 0,
                          "otherEnquiriesMoreThen2YrsBack": 0,
                          "judgements1YrBack": 0,
                          "judgements2YrsBack": 0,
                          "judgementsMoreThen2YrsBack": 0,
                          "notices1YrBack": 0,
                          "notices2YrsBack": 0,
                          "noticesMoreThen2YrsBack": 0,
                          "defaults1YrBack": 0,
                          "defaults2YrsBack": 0,
                          "defaultsMoreThen2YrsBack": 0,
                          "paymentProfiles1YrBack": 1,
                          "paymentProfiles2YrsBack": 0,
                          "paymentProfilesMoreThen2YrsBack": 0,
                          "traceAlerts1YrBack": 0,
                          "traceAlerts2YrsBack": 0,
                          "traceAlertsMoreThen2YrsBack": 0
                        },
                        "consumerInfoNO04": null,
                        "consumerNumberFrequencyNY01": null,
                        "creditVisionVV01": {
                          "consumerNo": "583826220",
                          "creditVisionVariableVV": {
                            "creditVisionVariable": [
                              {
                                "variableName": "AGG8624",
                                "variableValue": "-000000002.00"
                              },
                              {
                                "variableName": "AGG8909",
                                "variableValue": "+000000004.00"
                              },
                              {
                                "variableName": "TRV01",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "TRV06",
                                "variableValue": "+000000007.00"
                              },
                              {
                                "variableName": "TRV10",
                                "variableValue": "+000000004.00"
                              },
                              {
                                "variableName": "TRV11",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "TRV12",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "BALMAG01",
                                "variableValue": "+000000357.00"
                              },
                              {
                                "variableName": "BALMAG02",
                                "variableValue": "+000000357.00"
                              },
                              {
                                "variableName": "BALMAG03",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BALMAG04",
                                "variableValue": "+000000357.00"
                              },
                              {
                                "variableName": "PAYMNT51",
                                "variableValue": "+000000003.00"
                              },
                              {
                                "variableName": "PAYMNT56",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "PAYMNT68",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "PAYMNT72",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "PAYMNT73",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "PAYMNT77",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "CV12",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "CV13",
                                "variableValue": "+000000100.00"
                              },
                              {
                                "variableName": "CV25",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "CV26",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "REV81",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "REV83",
                                "variableValue": "+000000999.00"
                              },
                              {
                                "variableName": "REV92",
                                "variableValue": "+000000002.00"
                              },
                              {
                                "variableName": "REV112",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "REV142",
                                "variableValue": "+000000004.00"
                              },
                              {
                                "variableName": "REV152",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "BKC13",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BKC53",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BKC54",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BKC83",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BKC102",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BKC112",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "RET13",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "RET53",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "RET54",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "RET83",
                                "variableValue": "+000000999.00"
                              },
                              {
                                "variableName": "RET84",
                                "variableValue": "+000000999.00"
                              },
                              {
                                "variableName": "RET92",
                                "variableValue": "+000000002.00"
                              },
                              {
                                "variableName": "RET122",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "REV320",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "REV326",
                                "variableValue": "+000003777.00"
                              },
                              {
                                "variableName": "BKC323",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BKC325",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BKC326",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "RET315",
                                "variableValue": "+000000011.00"
                              },
                              {
                                "variableName": "RET326",
                                "variableValue": "+000003777.00"
                              },
                              {
                                "variableName": "AT01S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "AT06S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "AT20S",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "AT21SF",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "AT25S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "AT27S",
                                "variableValue": "-000000006.00"
                              },
                              {
                                "variableName": "AT27SF",
                                "variableValue": "-000000006.00"
                              },
                              {
                                "variableName": "AT31SF",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "AT34AF",
                                "variableValue": "+000000054.00"
                              },
                              {
                                "variableName": "AT34B",
                                "variableValue": "+000000054.00"
                              },
                              {
                                "variableName": "AT103S",
                                "variableValue": "+000000100.00"
                              },
                              {
                                "variableName": "AT104SF",
                                "variableValue": "+000000100.00"
                              },
                              {
                                "variableName": "BC12S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BC27S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BC30S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BC31S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BC34S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BC110S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "BR109S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "FI34S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "G002B",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G003S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G011S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G011SF",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G042S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G043S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G095S",
                                "variableValue": "-000000004.00"
                              },
                              {
                                "variableName": "G106S",
                                "variableValue": "+000000256.00"
                              },
                              {
                                "variableName": "G200SF",
                                "variableValue": "+000000100.00"
                              },
                              {
                                "variableName": "G218BF",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G222SF",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "G230S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "G230SF",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "G237S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G242S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G251A",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G303S",
                                "variableValue": "+000000002.00"
                              },
                              {
                                "variableName": "G310S",
                                "variableValue": "+000000002.00"
                              },
                              {
                                "variableName": "G311S",
                                "variableValue": "+000000002.00"
                              },
                              {
                                "variableName": "G511S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G512S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "G514S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "G515S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "G516S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "G526S",
                                "variableValue": "+000000347.00"
                              },
                              {
                                "variableName": "G530S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "G980S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "IN06S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "IN12S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "IN21S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "IN27S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "FO02S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "FS02S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "FS09S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "FS21S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "FS34S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "PB34S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "RE02S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "RE03S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "RE09S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "RE20S",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "RE21S",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "RE24S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "RE25S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "RE102S",
                                "variableValue": "+000007050.00"
                              },
                              {
                                "variableName": "RT09S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "RR06S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "RR20S",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "RR21S",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "RR24S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "RR25S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "RR27S",
                                "variableValue": "-000000006.00"
                              },
                              {
                                "variableName": "RR36S",
                                "variableValue": "+000000009.00"
                              },
                              {
                                "variableName": "RR57S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "RR104S",
                                "variableValue": "+000000054.00"
                              },
                              {
                                "variableName": "S004S",
                                "variableValue": "+000000012.00"
                              },
                              {
                                "variableName": "TEL27S",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "DM003S",
                                "variableValue": "-6"
                              },
                              {
                                "variableName": "DM005S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "DM008S",
                                "variableValue": "DOMESTIC WORKER"
                              },
                              {
                                "variableName": "DM009S",
                                "variableValue": "-6"
                              },
                              {
                                "variableName": "DM099S",
                                "variableValue": "0"
                              },
                              {
                                "variableName": "DM101S",
                                "variableValue": "0299"
                              },
                              {
                                "variableName": "DM205S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "DM206S",
                                "variableValue": "+000000000.00"
                              },
                              {
                                "variableName": "DM215S",
                                "variableValue": "+000000004.00"
                              },
                              {
                                "variableName": "DM216S",
                                "variableValue": "+000000009.00"
                              },
                              {
                                "variableName": "DM225S",
                                "variableValue": "-000000004.00"
                              },
                              {
                                "variableName": "DM226S",
                                "variableValue": "-000000004.00"
                              },
                              {
                                "variableName": "DM235S",
                                "variableValue": "+000000001.00"
                              },
                              {
                                "variableName": "DM236S",
                                "variableValue": "+000000256.00"
                              },
                              {
                                "variableName": "REAP01",
                                "variableValue": "+000000385.00"
                              },
                              {
                                "variableName": "DDS001",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "DDS005",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "DDS011",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "DDS012",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "DDS013",
                                "variableValue": "-000000001.00"
                              },
                              {
                                "variableName": "DDS015",
                                "variableValue": "-000000001.00"
                              }
                            ]
                          }
                        },
                        "debtCounsellingDC01": null,
                        "defaultsND07": null,
                        "disputeIndicatorDI01": null,
                        "empiricaEM07": {
                          "consumerNo": "583826220",
                          "empiricaScore": 589,
                          "exclusionCode": "",
                          "exclusionCodeDescription": "",
                          "reasonCode": {
                            "string": [
                              "23",
                              "31",
                              "38",
                              "66"
                            ]
                          },
                          "reasonDescription": {
                            "string": [
                              "Number of accounts now paid as agreed",
                              "Time accounts established",
                              "Balance / limit ratio on revolving accounts",
                              "Delinquency on recently opened accounts"
                            ]
                          },
                          "expansionScore": "",
                          "expansionScoreDescription": "",
                          "empiricaVersion": "AOV5.0"
                        },
                        "employmentNM04": null,
                        "enquiriesNE09": null,
                        "fraudScoreFS01": null,
                        "hawkNH05": null,
                        "idvNI01": null,
                        "incomeEstimatorT102": {
                          "consumerNo": "583826220",
                          "predictedIncome": "1100"
                        },
                        "incomeEstimatorI401": {
                          "scoreVersion": "0004",
                          "lineNumber": 1,
                          "consumerNo": "583826220",
                          "variableCount": 9,
                          "headingLength": 10,
                          "incomeEstimatorI4Variable": {
                            "incomeEstimatorVariableI401": [
                              {
                                "variableName": "FLTR01",
                                "variableValue": "0"
                              },
                              {
                                "variableName": "FLTR02",
                                "variableValue": "0"
                              },
                              {
                                "variableName": "FLTR03",
                                "variableValue": "0"
                              },
                              {
                                "variableName": "FLTR04",
                                "variableValue": "0"
                              },
                              {
                                "variableName": "FLTR05",
                                "variableValue": "0"
                              },
                              {
                                "variableName": "IEV4_NETT",
                                "variableValue": "001592"
                              },
                              {
                                "variableName": "FORMULA",
                                "variableValue": "100% Low Income Model"
                              },
                              {
                                "variableName": "IEV4_BAND",
                                "variableValue": "AB 1001 - 2000"
                              },
                              {
                                "variableName": "CONFIDENCE",
                                "variableValue": "085"
                              }
                            ]
                          }
                        },
                        "judgementsNJ07": null,
                        "nlrCounterSegmentMC01": {
                          "nlrCounterSeqmentMC01": [
                            {
                              "SegmentCode": "MC",
                              "ConsumerNumber": "000000000",
                              "CurrentYearEnquiriesClient": "000",
                              "CurrentYearEnquiriesOtherSubscribers": "000",
                              "CurrentYearPositiveNLRLoans": "000",
                              "CurrentYearHighestMonthsInArrears": "000",
                              "PreviousYearEnquiriesClient": "000",
                              "PreviousYearEnquiriesOtherSubscribers": "000",
                              "PreviousYearPositiveNLRLoans": "000",
                              "PreviousYearHighestMonthsInArrears": "000",
                              "AllOtherYearEnquiriesClient": "000",
                              "AllOtherYearEnquiriesOtherSubscribers": "000",
                              "AllOtherYearPositiveNLRLoans": "000",
                              "AllOtherYearsHighestMonthsInArrears": "000",
                              "CumulativeInstalmentValue": "000000000",
                              "CumulativeOutstandingBalance": "000000000",
                              "WorstMonthInArrearsEver": "000"
                            }
                          ]
                        },
                        "nlrSummaryMY01": {
                          "consumerNo": 583826220,
                          "totalActiveAccounts": 0,
                          "totalClosedAccounts24Mths": 0,
                          "totalAdverseAccounts24Mths": 0,
                          "highestActualMonths24Mths": 0,
                          "noRevolvingAccounts": 0,
                          "noCurrentInstallmentAccounts": 0,
                          "noCurrentOpenAccounts": 0,
                          "currentBalance": 0,
                          "currentBalanceInd": null,
                          "currentMonthlyInstallment": 0,
                          "currentMonthlyInstallmentBalInd": null,
                          "cumulativeArrearsAmount": 0,
                          "cumulativeArrearsAmountBalanceInd": null
                        },
                        "noticesNN08": null,
                        "paymentProfileNP15": null
                      },
                      "bureauBC": {
                        "bcc04": [
                          {
                            "name": "DM001AL",
                            "value": "+000000060"
                          },
                          {
                            "name": "DM002AL",
                            "value": "F"
                          },
                          {
                            "name": "DM003AL",
                            "value": "N"
                          },
                          {
                            "name": "DM004AL",
                            "value": "+000000299"
                          },
                          {
                            "name": "DM005AL",
                            "value": "-000000004"
                          },
                          {
                            "name": "DM006AL",
                            "value": "-000000004"
                          },
                          {
                            "name": "DM007AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "EQ001AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "EQ001CL",
                            "value": "+000000000"
                          },
                          {
                            "name": "EQ001FN",
                            "value": "+000000000"
                          },
                          {
                            "name": "EQ002AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "EQ002CL",
                            "value": "-000000001"
                          },
                          {
                            "name": "EQ002FC",
                            "value": "-000000001"
                          },
                          {
                            "name": "EQ002NL",
                            "value": "-000000001"
                          },
                          {
                            "name": "EQ003CL",
                            "value": "-000000001"
                          },
                          {
                            "name": "EQ003FN",
                            "value": "-000000001"
                          },
                          {
                            "name": "EQ004AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "EQ004CL",
                            "value": "-000000001"
                          },
                          {
                            "name": "EQ004FC",
                            "value": "-000000001"
                          },
                          {
                            "name": "EQ004NL",
                            "value": "-000000001"
                          },
                          {
                            "name": "EQ007AL",
                            "value": "+000000012"
                          },
                          {
                            "name": "EQ008AL",
                            "value": "+000000012"
                          },
                          {
                            "name": "EQ008CL",
                            "value": "-000000001"
                          },
                          {
                            "name": "EQ008FC",
                            "value": "-000000001"
                          },
                          {
                            "name": "NG001AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "NG004AL",
                            "value": "-000000002"
                          },
                          {
                            "name": "NG008AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "NG011AL",
                            "value": "-000000002"
                          },
                          {
                            "name": "NG022AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "NG034AL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP001AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP001CC",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP001CL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP001FC",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP001FL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP001NL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP001PL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP002AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP002FC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP003AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP005AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP005CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP005FL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP005PL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP006AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP007AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP007NL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP008AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP008NL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP009NL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP013AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP014AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP017CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP020AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP027AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP027CL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP032CL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP033AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP033CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP034AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP035CL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP040CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP044AL",
                            "value": "+000000001"
                          },
                          {
                            "name": "PP044FC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP044NL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP045AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP045FL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP046CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP050AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP050CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP051AL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP051CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP052AL",
                            "value": "-000000003"
                          },
                          {
                            "name": "PP053AL",
                            "value": "-000000003"
                          },
                          {
                            "name": "PP058AL",
                            "value": "+000000012"
                          },
                          {
                            "name": "PP058CL",
                            "value": "+000000012"
                          },
                          {
                            "name": "PP058NL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP059AL",
                            "value": "+000000008"
                          },
                          {
                            "name": "PP059FC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP060AL",
                            "value": "-000000003"
                          },
                          {
                            "name": "PP060CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP060CL",
                            "value": "-000000003"
                          },
                          {
                            "name": "PP061AL",
                            "value": "-000000003"
                          },
                          {
                            "name": "PP066AL",
                            "value": "+000000012"
                          },
                          {
                            "name": "PP067AL",
                            "value": "+000000012"
                          },
                          {
                            "name": "PP068AL",
                            "value": "+000000012"
                          },
                          {
                            "name": "PP068CL",
                            "value": "+000000012"
                          },
                          {
                            "name": "PP069AL",
                            "value": "+000000012"
                          },
                          {
                            "name": "PP069CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP069NL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP070AL",
                            "value": "+000000054"
                          },
                          {
                            "name": "PP070CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP070CL",
                            "value": "+000000054"
                          },
                          {
                            "name": "PP070FC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP070NL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP071AL",
                            "value": "+000000385"
                          },
                          {
                            "name": "PP072CC",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP074AL",
                            "value": "-000000005"
                          },
                          {
                            "name": "PP078CL",
                            "value": "+000007050"
                          },
                          {
                            "name": "PP079AL",
                            "value": "-000000005"
                          },
                          {
                            "name": "PP081CL",
                            "value": "+000007050"
                          },
                          {
                            "name": "PP082NL",
                            "value": "-000000002"
                          },
                          {
                            "name": "PP100CL",
                            "value": "+000000000"
                          },
                          {
                            "name": "PP104CL",
                            "value": "+000000000"
                          }
                        ]
                      }
                    }
                  }
                }
              },
              "itcFraudData": {
                "status": "SUCCESS",
                "timestamp": 1744451750340,
                "itcFraudResponse": {
                  "processRequestTrans41Response": {
                    "processRequestTrans41Result": {
                      "responseStatus": "Success",
                      "errorCode": null,
                      "errorMessage": null,
                      "processingStartDate": 1744451749781,
                      "processingTimeSecs": 0.21667409999999998,
                      "uniqueRefGuid": "8470b4f0-eb44-4c7e-a31c-72f073656a8f",
                      "addressVerificationNR01": {
                        "last24Hours": "000000",
                        "last48Hours": "000000",
                        "last96Hours": "000000",
                        "last30Days": "000000",
                        "addressMessage": "address1"
                      },
                      "akaNamesNK04": {
                        "aKANamesNK04": [
                          {
                            "recordSeq": "01",
                            "part": "001",
                            "partSeq": "01",
                            "consumerNo": "583826220",
                            "informationDate": 20250412,
                            "aKAName": "BERTHA OUMAKIE"
                          },
                          {
                            "recordSeq": "02",
                            "part": "001",
                            "partSeq": "01",
                            "consumerNo": "583826220",
                            "informationDate": 20031209,
                            "aKAName": "TSHELWANE BERTHA OUM"
                          }
                        ]
                      },
                      "bccBC04": null,
                      "bccB701": null,
                      "ccaSummaryMX01": null,
                      "consEnqTransInfo0102": {
                        "definiteMatchCount": "1",
                        "possibleMatchCount": "00",
                        "matchedConsumerNo": "583826220",
                        "possibleConsumerNo": null,
                        "possibleAdverseIndicator": null
                      },
                      "consumerCountersNC04": null,
                      "consumerInfoNO04": {
                        "recordSeq": "01",
                        "partType": null,
                        "partSeq": "01",
                        "consumerNo": "583826220",
                        "surname": "TSHELWANE",
                        "forename1": "BERTHA",
                        "forename2": "BO",
                        "forename3": "",
                        "title": "MS",
                        "gender": "F",
                        "nameInfoDate": "20031223",
                        "dateOfBirth": "19640729",
                        "identityNo1": "6407290763086",
                        "identityNo2": "",
                        "maritalStatusCode": "S",
                        "maritalStatusDesc": "SINGLE",
                        "spouseName1": "",
                        "spouseName2": "",
                        "telephoneNumbers": "",
                        "deceasedDate": "00000000"
                      },
                      "consumerNumberFrequencyNY01": null,
                      "creditVisionVV01": null,
                      "debtCounsellingDC01": null,
                      "defaultsND07": null,
                      "disputeIndicatorDI01": null,
                      "empiricaEM07": null,
                      "employmentNM04": {
                        "employmentNM04": [
                          {
                            "recordSeq": "01",
                            "part": "001",
                            "partSeq": "01",
                            "consumerNo": "583826220",
                            "informationDate": "20250412",
                            "occupation": "",
                            "employerName": "PENSIONER",
                            "employmentPeriod": "00"
                          },
                          {
                            "recordSeq": "02",
                            "part": "001",
                            "partSeq": "01",
                            "consumerNo": "583826220",
                            "informationDate": "20031223",
                            "occupation": "DOMESTIC WORKER",
                            "employerName": "MR MRS RAY WISE",
                            "employmentPeriod": "00"
                          }
                        ]
                      },
                      "enquiriesNE09": {
                        "enquiriesNE09": [
                          {
                            "recordSeq": "01",
                            "part": "001",
                            "partSeq": "01",
                            "consumerNo": "583826220",
                            "dateOfEnquiry": "20250412",
                            "subscriber": "WOOLWORTHS FINANC",
                            "contact": "Woolworths Financial Service 214115234",
                            "enquiryAmount": "000000",
                            "enquiryTypeCode": "32",
                            "enquiryType": "CREDIT APP"
                          },
                          {
                            "recordSeq": "02",
                            "part": "001",
                            "partSeq": "01",
                            "consumerNo": "583826220",
                            "dateOfEnquiry": "20240430",
                            "subscriber": "TENACITY FINANCIA",
                            "contact": "PEP 0219281000",
                            "enquiryAmount": "000000",
                            "enquiryTypeCode": "32",
                            "enquiryType": "CREDIT APP"
                          }
                        ]
                      },
                      "fraudScoreFS01": {
                        "recordSequence": "01",
                        "part": "001",
                        "partSequence": "01",
                        "consumerNo": "583826220",
                        "rating": "2",
                        "ratingDescription": "MINOR IRREGULARITIES - LOW PROBABILITY OF SUSPICIO",
                        "reasonCode": {
                          "string": [
                            "BS28"
                          ]
                        },
                        "reasonDescription": {
                          "string": [
                            "CELLULAR NUMBER ON BUREAU HEADER AND NO CELLULAR NUMBER ON APPLICATION"
                          ]
                        }
                      },
                      "hawkNH05": null,
                      "idvNI01": {
                        "iDVerifiedCode": "V0",
                        "iDVerifiedDesc": "ID and Surname Verified",
                        "iDWarning": "",
                        "iDDesc": "",
                        "verifiedSurname": "TSHELWANE",
                        "verifiedForename1": "BERTHA",
                        "verifiedForename2": "BO",
                        "deceasedDate": null
                      },
                      "incomeEstimatorT102": null,
                      "incomeEstimatorI401": null,
                      "judgementsNJ07": null,
                      "nlrCounterSegmentMC01": null,
                      "nlrSummaryMY01": null,
                      "noticesNN08": null,
                      "paymentProfileNP15": {
                        "paymentProfileNP15": [
                          {
                            "consumerNo": "583826220",
                            "lastUpdateDate": "20250408",
                            "supplierName": "PEP SOUTH AFRICA",
                            "industryCode": "CL",
                            "industryDesc": "Clothing",
                            "accountTypeCode": "R",
                            "accountTypeDesc": "REVOLVING",
                            "accountNumber": "1020243004024593",
                            "subAccount": "",
                            "dateOpened": "20240430",
                            "openingBalance": "007050",
                            "instalment": 385,
                            "currentBalance": 3790,
                            "terms": 0,
                            "date": {
                              "string": [
                                "202504",
                                "202503",
                                "202502",
                                "202501",
                                "202412",
                                "202411",
                                "202410",
                                "202409",
                                "202408",
                                "202407",
                                "202406",
                                "202405",
                                "202404",
                                "202403",
                                "202402",
                                "202401",
                                "202312",
                                "202311",
                                "202310",
                                "202309",
                                "202308",
                                "202307",
                                "202306",
                                "202305"
                              ]
                            },
                            "status": {
                              "string": [
                                "0",
                                "0",
                                "0",
                                "0",
                                "0",
                                "0",
                                "0",
                                "0",
                                "1",
                                "0",
                                "0",
                                "0",
                                "=",
                                "=",
                                "=",
                                "=",
                                "=",
                                "=",
                                "=",
                                "=",
                                "=",
                                "=",
                                "=",
                                "="
                              ]
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              },
              "casaScreeningData": {
                "status": "SUCCESS",
                "timestamp": 1744452267659,
                "casaScreeningResponse": {
                  "refNo": 153285029,
                  "status": "PENDING",
                  "pepStatus": "",
                  "msgNo": 0,
                  "msg": null
                }
              },
              "casaRiskProfilingData": {
                "status": "SUCCESS",
                "timestamp": 1744452275199,
                "casaRiskProfilingResponse": {
                  "msgNo": 200,
                  "msg": "Risk Profiling Completed Succesfully!! Score is $3440.0$",
                  "riskRating": "L",
                  "metaData": null,
                  "status": "PROCEED"
                }
              },
              "getInvitesData": {
                "status": "SUCCESS",
                "timestamp": 1744451457226,
                "getInvitesResponse": {
                  "getInvitesResponse": null
                }
              },
              "getCustomerDemographicData": {
                "status": "SUCCESS",
                "timestamp": 1744451456429,
                "getCustomerDemographicResponse": {
                  "consolidatedResponseType": {
                    "personList": null,
                    "applicationList": null,
                    "prospectList": null,
                    "hasActiveRewardsCard": null,
                    "ABSAAccountDetailsList": {
                      "ABSACustomerDetailList": [
                        null
                      ]
                    },
                    "errorMessageType": null,
                    "accountList": null
                  }
                }
              },
              "wUpdateData": null,
              "existingCustomerData": null,
              "sageMakerData": {
                "status": "SUCCESS",
                "timestamp": 1744451752482,
                "sageMakerResponse": {
                  "retailModelLeaf": 18,
                  "retailModelUpdated": 1744416000000,
                  "customerNo": "NONE",
                  "thinBaseCompTran1m": "0.000",
                  "CC_BillingDate": null,
                  "latencyInSeconds": "0",
                  "sagemakerVersion": "0.1.17"
                }
              },
              "poiServiceData": null,
              "ficaDocumentConfirmationData": null,
              "bankValidationData": null,
              "joinRewardsData": null,
              "digitalFraudData": null,
              "getCustomerContactDetailsData": {
                "status": "SUCCESS",
                "timestamp": 1744451751325,
                "getCustomerDetailsResponse": null,
                "getCustomerContactDetailsFault": null
              },
              "visionCreateData": null,
              "id": null,
              "applicationRole": null,
              "updatedBy": null,
              "createdBy": null,
              "generateDocumentData": null,
              "camsActivateData": null,
              "userDefinedFields": null,
              "updatedOn": null,
              "createdOn": null,
              "casaDocumentAcknowledgeData": null,
              "c2CreateUpdateData": null,
              "cifCreatePrimaryData": null,
              "camsCreatePrimaryData": null,
              "utiCheckoutData": null,
              "poiUploadData": null,
              "initiateCommunicationData": null,
              "calculatedValues": null,
              "communicationEvent": null,
              "externalData": null,
              "inProcess": "1",
              "liabilities": null,
              "idvCallbackStatus": null
            }
          ],
          "cardFulfillment": {
            "activationUserDateTime": null,
            "cardName": "MS B TSHELWANE",
            "cardReference": null,
            "cardReferenceConfirm": null,
            "checkoutReference": null,
            "checkoutReferenceConfirm": null,
            "expiryDate": null,
            "isActivated": null,
            "isPinProvidedToCustomer": null,
            "isPrintedSuccessfully": null,
            "lastFourDigits": null,
            "printFailureReason": null,
            "deliveryMethod": "MAIL_TO_ME",
            "utiReference": null,
            "deliveryCharge": 0,
            "deliveryAddressType": "RESIDENTIAL",
            "collectionStoreProvince": null,
            "collectionStore": null,
            "collectionStoreTier": null,
            "isCardIssued": null
          },
          "serviceCall": null,
          "applicationNumber": "2025041209498702",
          "updatedBy": null,
          "createdBy": null,
          "clientType": null,
          "agentIndFraud": null,
          "userDefinedFields": null,
          "sensitiveDataChange": null,
          "configurableValues": [
            {
              "name": "CONTACT_DETAIL_AUTHKEY",
              "value": "Jh7QXARA/DOlm5/J7QfTvgon+Ox58swpQmMQUOJNzFg="
            },
            {
              "name": "CBF_DESTINATION",
              "value": "Test"
            },
            {
              "name": "CBF_SUBSCRIBER_CODE",
              "value": "6625"
            },
            {
              "name": "CBF_ENQUIRER_CONTACT_PHONENO",
              "value": "214115234"
            },
            {
              "name": "CBF_ENQUIRY_AMOUNT",
              "value": "0"
            },
            {
              "name": "CBF_ENQUIRY_TYPE",
              "value": "32"
            },
            {
              "name": "CBF_SECURITY_CODE",
              "value": "55103"
            },
            {
              "name": "UPLOAD_DOCUMENT_USERNAME",
              "value": "OMSystem"
            },
            {
              "name": "UPLOAD_DOCUMENT_USERPASSWORD",
              "value": "fekpg05"
            },
            {
              "name": "UPLOAD_DOCUMENT_SAVIINGATEWAY",
              "value": "false"
            },
            {
              "name": "UPLOAD_DOCUMENT_IDTYPE",
              "value": "IDENTIFICATION"
            },
            {
              "name": "UPLOAD_DOCUMENT_ISVALID",
              "value": "true"
            },
            {
              "name": "UPLOAD_DOCUMENT_OWNER",
              "value": "w7131435"
            },
            {
              "name": "UPLOAD_DOCUMENT_SOURCESYSTEMID",
              "value": "OM4"
            },
            {
              "name": "CBE_COMPANY",
              "value": "Woolworths"
            },
            {
              "name": "CBE_DECISION_SERVICE_SOURCE",
              "value": "NB"
            },
            {
              "name": "CBE_BRANCH",
              "value": "CPA"
            },
            {
              "name": "CBE_USER",
              "value": "Woolworths"
            },
            {
              "name": "CBE_PASSWORD",
              "value": "K^fQSL:|]8qI5Gp"
            },
            {
              "name": "CBE_RULE_SET",
              "value": "WFS"
            }
          ],
          "applicationProductType": null,
          "applicationTransactionHistory": null,
          "authorizedUser": null,
          "balanceTransfer": null,
          "communicationEvent": null,
          "creditApplication": null,
          "creditRequest": null,
          "creditSensitiveDataChange": null,
          "decisionRequest": null,
          "decisionResponse": {
            "applicationDecisions": {
              "applicationEligibility": [
                {
                  "status": "Decline",
                  "reasonCodes": [
                    {
                      "isOverridable": 1,
                      "isFraudOverridable": null,
                      "code": "MinScoreRequirementRule",
                      "message": "You do not meet the minimum policy requirements",
                      "internalRuleId": "MinScoreRequirementRule",
                      "feReasonCode": "SD",
                      "proposedStatus": "Decline",
                      "category": "Storecard",
                      "fstustring": null,
                      "rank": 7,
                      "name": null,
                      "referenceId": null
                    },
                    {
                      "isOverridable": 0,
                      "isFraudOverridable": null,
                      "code": "blockDownSellPL",
                      "message": "Personal Loan not available for cross sell",
                      "internalRuleId": "blockDownSellPL",
                      "feReasonCode": "BD",
                      "proposedStatus": "Decline",
                      "category": "Personal Loan",
                      "fstustring": null,
                      "rank": 3,
                      "name": null,
                      "referenceId": null
                    }
                  ],
                  "applicationId": 498595,
                  "creditReviewType": "PRODUCT_ELIGIBILITY",
                  "eligibilityReason": null,
                  "partyId": null,
                  "placeHolder": null
                },
                {
                  "status": "Accept",
                  "reasonCodes": null,
                  "applicationId": 498595,
                  "creditReviewType": "FRAUD_ELIGIBILITY",
                  "eligibilityReason": null,
                  "partyId": null,
                  "placeHolder": null
                },
                {
                  "status": "Accept",
                  "reasonCodes": null,
                  "applicationId": 498595,
                  "creditReviewType": "APPLICATION_ELIGIBILITY",
                  "eligibilityReason": null,
                  "partyId": null,
                  "placeHolder": null
                },
                {
                  "status": "Decline",
                  "reasonCodes": [
                    {
                      "isOverridable": 1,
                      "isFraudOverridable": null,
                      "code": "creditCardMinSalaryRule",
                      "message": "Your salary is below the minimum income required for this product",
                      "internalRuleId": "creditCardMinSalaryRule",
                      "feReasonCode": "DS",
                      "proposedStatus": "Decline",
                      "category": "CreditCard",
                      "fstustring": null,
                      "rank": 3,
                      "name": null,
                      "referenceId": null
                    },
                    {
                      "isOverridable": 1,
                      "isFraudOverridable": null,
                      "code": "MinScoreRuleCC ",
                      "message": "You do not meet the minimum policy requirements",
                      "internalRuleId": "MinScoreRuleCC ",
                      "feReasonCode": "SD",
                      "proposedStatus": "Decline",
                      "category": "CreditCard",
                      "fstustring": null,
                      "rank": 7,
                      "name": null,
                      "referenceId": null
                    }
                  ],
                  "applicationId": 498595,
                  "creditReviewType": "PRODUCT_ELIGIBILITY",
                  "eligibilityReason": null,
                  "partyId": null,
                  "placeHolder": null
                },
                {
                  "status": "Accept",
                  "reasonCodes": null,
                  "applicationId": 498595,
                  "creditReviewType": "PRODUCT_ELIGIBILITY",
                  "eligibilityReason": null,
                  "partyId": null,
                  "placeHolder": null
                }
              ],
              "caseReviewRequired": null
            },
            "datetime": null,
            "decision": null,
            "decisionAttribute": null,
            "overrideDecision": null,
            "partyDecisions": null,
            "productResponse": null,
            "reasonForDecline": null,
            "recommendedDecision": null,
            "strategyVersion": null
          },
          "genericAttribute": null,
          "inProcess": null,
          "isCreditSensitiveChange": true,
          "isProcessSensitiveChange": false,
          "messageList": null,
          "processSensitiveDataChange": null,
          "prodCatResponse": null,
          "resubmittedOn": null,
          "transferToChecking": null,
          "userRole": null,
          "workflowVariables": null,
          "GenericEmailForSecondaryCard": null
        },
        "applicationDecisionOutputs": null,
        "requestTimestamp": null,
        "responseTimestamp": null,
        "effectiveTimestamp": null,
        "decisionServiceParameters": {
          "loggerEnabled": false,
          "traceEnabled": false,
          "traceJsonEnabled": false,
          "testModeEnabled": false,
          "performanceTrackerEnabled": false,
          "unsetSpecialValues": true,
          "returnInputData": true,
          "returnRuntimeDecisions": false,
          "systemMessageLevel": "ERROR"
        },
        "decisionTraceItems": null,
        "decisionRequestId": null,
        "processContext": null,
        "decisionLogicVersion": null,
        "decisionLogicReleaseNote": null,
        "testItem": null,
        "decisionRequestStatus": null,
        "decisionTrace": null,
        "systemMessages": null
      },
      "startDateTime": null,
      "endDateTime": null,
      "orchestrationDuration": null,
      "orchestrationServiceParameters": {
        "systemMessageLevel": "INFO"
      },
      "orchestrationRequestId": null,
      "orchestrationRequestStatus": null,
      "systemMessages": null
    }
  }
]
  `;


function JsonViewer() {
  const g = React.useMemo(() => useJsonGraph(sampleJson), [sampleJson]);

  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  // Handler to toggle collapse
  const toggle = useCallback((id: string) => {
    console.log("toggled");
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // Compute visible nodes/edges based on collapsed state
  const { nodes, edges } = useMemo(
    () => useExpandCollapse(g.nodes, g.edges, collapsed, toggle),
    [g.nodes, g.edges, collapsed, toggle]
  );

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);
  const [layouted, setLayouted] = useState(false);

  const isFirstRender = useRef(true);

  // Sync rfNodes/rfEdges with computed nodes/edges
  useEffect(() => {

    if(isFirstRender.current) {
      isFirstRender.current = false;
      return ;
    }

    // merge rfNodes with new nodes
    let newNodes: Node<JsonNodeData>[] = nodes.map((node) => {
      let rfNode = rfNodes.find((n) => n.id === node.id);
      if (rfNode) {
        return {
          ...rfNode,
          ...node,
        };
      }

      return node;
    });

    let newEdges: Edge[] = edges.map((edge) => {
      let rfEdge = rfEdges.find((e) => e.id === edge.id);
      if (rfEdge) {
        return {
          ...rfEdge,
          ...edge,
        };
      }
      return edge;
    });

    setLayouted(false); // Reset layout state on node changes
    setRfNodes(newNodes as Node<JsonNodeData>[]);
    setRfEdges(newEdges);
  }, [nodes, edges]);

  useEffect(() => {
    if (!layouted && !isFirstRender.current) {
      // console.log("Nodes before layout:", rfNodes);
      //   console.log("hey");
      // Check if all nodes have measured dimensions
      const allNodesMeasured = rfNodes.every(
        (node) => node.measured?.width && node.measured?.height
      );

      if (allNodesMeasured) {
        console.log("Applying layout...");

        // const visibleNodes = rfNodes.filter((n) => !n.hidden);
        // const visibleEdges = rfEdges.filter((e) => !e.hidden);

        const { nodes, edges } = getLayoutedElements(rfNodes, rfEdges);

        // // Merge layouted positions back into the full node list
        // const allNodes = nodes.map((node) => {
        //   const layouted = nodes.find((n) => n.id === node.id);
        //   return layouted ? { ...node, position: layouted.position } : node;
        // });

        // const allEdges = edges.map((edge) => {
        //   const layouted = edges.find((e) => e.id === edge.id);
        //   return layouted ? { ...edge, source: layouted.source, target: layouted.target } : edge;
        // });

        setRfNodes(nodes as Node<JsonNodeData>[]);
        setRfEdges(edges);
        setLayouted(true); // Prevent re-layouting
      }
    }
  }, [rfNodes, rfEdges, layouted]);

  // console.log(rfNodes);

  //   console.log("Graph:", g);

  return (
    <>
      <ReactFlowProvider>
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={(changes) => {
            onNodesChange(changes);

            // setLayouted(false); // Reset layout state on node changes
          }}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#f5f5f5" />
          <Controls />
          <MiniMap zoomable pannable/>
        </ReactFlow>
      </ReactFlowProvider>
    </>
  );
}

export default {
  name: "JSON Schema Viewer",
  route: "/json-schema-viewer",
  component: JsonViewer,
  icon: "🔍",
};
