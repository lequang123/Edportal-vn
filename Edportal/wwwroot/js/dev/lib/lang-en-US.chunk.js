/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/sources/js/common/languages/ViewResources.js":
/*!**********************************************************!*\
  !*** ./www/sources/js/common/languages/ViewResources.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window._language_en_US = {
  Action: 'Action',
  Active: 'Active',
  ActivePICSuccess: 'Active PIC successfully!',
  All: 'All',
  Amount: 'Amount',
  Any: 'Any',
  AssignPIC: 'Assign PIC',
  AssignPICSuccessfully: 'Assign PIC Successfully!',
  BotBlocked: 'Bot Blocked',
  BotName: 'Bot Name',
  BotRequired: 'Bot is required!',
  Category: 'Category',
  CategoryRequired: 'Category is required!',
  ChangePICState: 'Change PIC State',
  ChatType: 'Chat Type',
  ChatTypeMapping: 'Chat Type Mapping',
  ChatTypeRequired: 'Chat Type is required!',
  Close: 'Close',
  Closed: 'Closed',
  ComfirmResendListAndIgnoreNotification: 'Are you sure you want to resend notification list #2 and ignore notification list #1?',
  ComfirmResendNotification: 'Are you sure you want to resend selected Notification{0}: {1}?',
  CommunicationMustHaveValue: 'Communication must have value!',
  CommunicationRequired: 'Communication tool is required!',
  CommunicationTool: 'Communication Tool',
  CommunicationToolRequired: 'CommunicationTool is required!',
  Confirmation: 'Confirmation',
  ConfirmDirtyMessage: 'There are some changes. Are you sure you want to ignore these changes?',
  Content: 'Content',
  Country: 'Country',
  Currency: 'Currency',
  Customer: 'Customer',
  DeactivatePICSuccess: 'Deactivate PIC successfully!',
  DefaultCommunicationSetting: 'Default Communication Setting',
  DefaultPIC: 'Default PIC',
  DefaultPICRequired: 'Default PIC is required!',
  DeleteCommunicationSuccessfully: 'Delete communication setting successfully!',
  DeleteNotificationTemplateSuccessfully: 'Delete notification template successfully!',
  DeleteNotificationTypeSuccessfully: 'Delete notification type successfully!',
  DirectAccount: 'Direct Account',
  DirectAccountRequired: 'Direct account is required',
  DisableCatSubCatfilters: 'Disable Cat/Sub-Cat filters',
  Disabled: 'Disabled',
  Duplicated: 'Duplicated',
  Edit: 'Edit',
  EditFeedbackSubjectTemplate: 'Edit Feedback Subject Template',
  EditFeedbackSubjectTemplateSuccessfully: 'Edit feedback subject template successfully',
  EditGroupMapping: 'Edit Group Chat Mapping',
  EditNotificationTemplate: 'Edit Notification Template',
  EditNotificationTemplateSuccessfully: 'Edit notification template successfully!',
  EditNotificationType: 'Edit Notification Type',
  EditNotificationTypeSuccessfully: 'Edit notification type successfully!',
  EditPersonalMapping: 'Edit Personal Chat Mapping',
  EditPIC: 'Edit PIC',
  EditPICSuccess: 'Edit PIC successfully!',
  EditStatusFeedbackSubjectSuccessfully: 'Edit Status Feedback Subject Successfully',
  Error: 'Error',
  ErrorNotification: 'Error Notification',
  ErrorOccuredWhileSendingTheNotificationToTheFollowingRecipient: 'Error occured while sending the notification to the following recipient',
  ExcludeIgnoredAccounts: 'Exclude ignored accounts',
  ExcludeTestAccounts: 'Exclude test accounts',
  FeedbackSubjectContentRequired: 'Feedback Subject Content is required!',
  FeedbackSubjectInsert: 'Insert New Feedback Subject',
  FeedbackSubjectManagement: 'Feedback Subject Management',
  FeedbackSubjectTemplateContent: 'Feedback Subject Template Content',
  FieldMaxLength: '{0} must not over {1} characters long!',
  FieldRequired: '{0} is required!',
  From: 'From',
  GroupHeadline: 'Group Headline',
  GroupHeadlineRequired: 'Group Headline is required!',
  Guest: 'Guest',
  HeadlineType: 'Headline Type',
  Insert: 'Insert',
  InsertCommunicationSettingSuccessfully: 'Insert Communication Setting successfully!',
  InsertFeedbackSubjectTemplate: 'Feedback Subject Template',
  InsertFeedbackSubjectTemplateSuccessfully: 'Insert Feedback Subject Template successfully!',
  InsertNewSetting: 'Insert New Setting',
  InsertNotificationTemplate: 'Insert Notification Template',
  InsertNotificationTemplateSuccessfully: 'Insert notification template successfully!',
  InsertNotificationType: 'Insert Notification Type',
  InsertNotificationTypeSuccessfully: 'Insert Notification Type successfully!',
  InsertPersonalMapping: 'Insert Personal Chat Mapping',
  InsertPersonalMappingBtn: 'Insert Personal Chat Mapping',
  InsertPersonalMappingSuccessfully: 'Insert Personal Mapping successfully!',
  InsertPIC: 'Insert PIC',
  InsertPICSuccess: 'Insert PIC successfully!',
  Invalid: 'Invalid',
  InvalidUsernames: 'Invalid usernames: {0}',
  KeepAssign: 'Keep Assign',
  Language: 'Language',
  LanguageRequired: 'Language is required!',
  LetstalkID: 'Letstalk ID',
  LetstalkIdRequired: 'Letstalk ID is required!',
  LetstalkName: 'Letstalk Name',
  LetstalkName: 'Letstalk Name',
  ListOfAssignedDirectAccounts: 'List of assigned direct accounts',
  Listofcustomers: 'List of customers',
  ListofcustomersRequired: 'List of customers are required!',
  LogID: 'LogID',
  MappingStatus: 'Mapping Status',
  MessageID: 'Message ID',
  Month: 'Month',
  MultiplecustomersToolTip: 'Multiple customers can be entered, separated by commas. Ex: abc, xyz, etc.',
  Name: 'Name',
  NameRequired: 'Name is required!',
  NoData: 'No data',
  NotificationID: 'Notification ID',
  NotificationIDFromNotGreaterThanTo: 'From Notification ID cannot be greater than To Notification ID',
  NotificationIDMustHaveBoth: 'Notification ID must have both',
  NotificationList: 'Notification List',
  NotificationTemplate: 'Notification Template',
  NotificationType: 'Notification Type',
  NotificationTypeName: 'Notification Type Name',
  NotificationTypeNameRequired: 'Notification Type Name is required!',
  NotificationTypeRequired: 'Notification Type is required!',
  NotRefresh: 'Not refresh',
  OK: 'OK',
  OnlyShowUnassignedDirectAccounts: 'Only show unassigned direct accounts',
  Open: 'Open',
  OverMaxUnernameWhenAssignPic: 'You are not allowed to input over {0} usernames. Please check it!',
  PIC: 'PIC',
  PICAssignment: 'PIC Assignment',
  PICManagement: 'PIC Management',
  PICRequired: 'PIC is required!',
  Planned: 'Planned',
  PleaseChoose: 'Please Choose',
  PleaseChooseCurrency: 'Please choose Currency',
  PleaseChooseMappingStatus: 'Please Choose Mapping Status',
  PleaseChoosePosition: 'Please choose Position',
  PleaseChooseRole: 'Please choose a Role',
  PleaseChooseSite: 'Please choose Site',
  PleaseChooseStatus: 'Please choose Status',
  PleaseSelect: 'Please select ...',
  Position: 'Position',
  Reason: 'Reason',
  Recipient: 'Recipient',
  RecipientRequired: 'Recipient is required!',
  RecipientType: 'Recipient Type',
  RecipientTypeRequired: 'Recipient Type is required!',
  ReferenceId: 'ReferenceID',
  Remark: 'Remark',
  Remove: 'Remove',
  RemoveAndAssign: 'Remove & Assign',
  RemoveAssignmentSuccessfully: 'Remove {0} assignment successfully!',
  RemoveDefaultPICSuccessfully: 'Remove default PIC successfully!',
  RemovePICAssignment: 'Remove PIC Assignment',
  Resend: 'Resend',
  ResentSuccessfully: 'Resent successfully!',
  Resolve: 'Resolve',
  Resolved: 'Resolved',
  ResolvedBy: 'Resolved by',
  ResolvedNotification: 'Resolved Notification',
  Role: 'Role',
  RoleRequired: 'Role is required!',
  Save: 'Save',
  SaveAndContinue: 'Save & Continue',
  SelectOptions: 'Select options',
  SendDateTimeGMTA8: 'Send Date/Time (GMT+8)',
  Sender: 'Sender',
  Sending: 'Sending',
  Sent: 'Sent',
  SentAt: 'Sent At',
  SeparatedByComma: "Separated by ',' for multiple contact info",
  SetDefaultPIC: 'Set Default PIC',
  SetDefaultPICSuccessfully: 'Set default PIC successfully!',
  Site: 'Site',
  Status: 'Status',
  SubCategory: 'Sub-Category',
  SubCategoryRequied: 'Sub-Category is required!',
  Submit: 'Submit',
  Suspended: 'Suspended',
  SymbolNo: '#',
  System: 'System',
  SystemRequired: 'System is required!',
  TemplateContent: 'Template Content',
  TemplateId: 'Template Id',
  TemplateName: 'Template Name',
  TemplateNameRequired: 'Template Name is required!',
  TextNo: 'No.',
  ThereAreSomeChangesConfirmMessage: 'There are some changes. Are you sure you want to ignore these changes?',
  ThereAreUnassignedDirectAccounts: 'There are {0} unassigned direct accounts',
  TheRecipientOfNotificationIdHasBeenInactive: '{0}The Personal/Group of following selected Notification{1} have been deactivated: {2}',
  ThereIsNoData: 'There is no data',
  TheseAccountsAreNotDirectAccounts: 'These accounts are not direct accounts: {0}',
  TheseDirectAccountsDoNotBelongToGroupHeadline: 'These direct accounts do not belong to group headline: {0}',
  TheSelectedNoficationsAreAbleToResend: '2. The selected nofications are able to resend: <notificationIds>',
  TheSelectedNotificationsAreAbleToResend: '2. The selected Notifications are able to resend: {0}',
  Title: 'Title',
  TitleRequired: 'Title is required!',
  To: 'To',
  ToDateIsEarlierThanFromDate: 'ToDate is earlier than FromDate',
  Total: 'Total',
  Update: 'Update',
  UpdateChatTypeMappingSuccessfully: 'Update chat type mapping successfully!',
  UpdateCommunicationSettingSuccessfully: 'Update Communication Setting successfully!',
  UpdateDefaultPIC: 'Update Default PIC',
  UpdateGroupMappingSuccess: 'Update group chat mapping successfully!',
  UpdatePersonalMappingSuccess: 'Update personal chat mapping successfully!',
  UpdateSetting: 'Update Setting',
  Verify: 'Verify',
  VerifyListOfUsernameBeforeInsertSetting: 'You must verify the list of usernames before inserting this setting!',
  ViewDetail: 'View Detail'
};

/***/ }),

/***/ 0:
/*!****************************************************************!*\
  !*** multi ./www/sources/js/common/languages/ViewResources.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./www/sources/js/common/languages/ViewResources.js */"./www/sources/js/common/languages/ViewResources.js");


/***/ })

/******/ });
//# sourceMappingURL=lang-en-US.chunk.js.map