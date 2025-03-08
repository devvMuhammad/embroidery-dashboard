import { mysqlTable, primaryKey, varchar, int, longtext, datetime, unique, index, tinyint, float, smallint, double, bigint } from "drizzle-orm/mysql-core"

export const migrationhistory = mysqlTable("__migrationhistory", {
	migrationId: varchar("Migration_ID", { length: 100 }).notNull(),
	contextKey: varchar("Context_Key", { length: 200 }).notNull(),
	// Warning: Can't parse longblob from database
	// longblobType: longblob("Model").notNull(),
	productVersion: varchar("ProductVersion", { length: 32 }).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.migrationId, table.contextKey], name: "__migrationhistory_Migration_ID_Context_Key" }),
	]);

export const aspnetrestrictions = mysqlTable("aspnetrestrictions", {
	id: varchar("Id", { length: 128 }).notNull(),
	resource: varchar("Resource", { length: 256 }).notNull(),
	restriction: varchar("Restriction", { length: 256 }).notNull(),
	selected: tinyint("Selected"),
	discriminator: varchar("Discriminator", { length: 128 }).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "aspnetrestrictions_Id" }),
	]);

export const aspnetrolerestrictions = mysqlTable("aspnetrolerestrictions", {
	roleId: varchar("RoleId", { length: 128 }).notNull().references(() => aspnetroles.id, { onDelete: "cascade" }),
	restrictionId: varchar("RestrictionId", { length: 128 }).notNull().references(() => aspnetrestrictions.id, { onDelete: "cascade" }),
},
	(table) => [
		primaryKey({ columns: [table.roleId, table.restrictionId], name: "aspnetrolerestrictions_RoleId_RestrictionId" }),
	]);

export const aspnetroles = mysqlTable("aspnetroles", {
	id: varchar("Id", { length: 128 }).notNull(),
	name: varchar("Name", { length: 256 }).notNull(),
	isSystemProtected: tinyint("IsSystemProtected").notNull(),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "aspnetroles_Id" }),
	]);

export const aspnetusermachines = mysqlTable("aspnetusermachines", {
	userId: varchar("UserId", { length: 128 }).notNull().references(() => aspnetusers.id, { onDelete: "cascade" }),
	machineId: int("MachineId").notNull().references(() => machines.machineId, { onDelete: "cascade" }),
},
	(table) => [
		primaryKey({ columns: [table.userId, table.machineId], name: "aspnetusermachines_UserId_MachineId" }),
	]);

export const aspnetuserroles = mysqlTable("aspnetuserroles", {
	userId: varchar("UserId", { length: 128 }).notNull().references(() => aspnetusers.id, { onDelete: "cascade" }),
	roleId: varchar("RoleId", { length: 128 }).notNull().references(() => aspnetroles.id, { onDelete: "cascade" }),
},
	(table) => [
		primaryKey({ columns: [table.userId, table.roleId], name: "aspnetuserroles_UserId_RoleId" }),
	]);

export const aspnetusers = mysqlTable("aspnetusers", {
	id: varchar("Id", { length: 128 }).notNull(),
	email: varchar("Email", { length: 256 }),
	emailConfirmed: tinyint("EmailConfirmed").notNull(),
	passwordHash: longtext("PasswordHash"),
	securityStamp: longtext("SecurityStamp"),
	phoneNumber: longtext("PhoneNumber"),
	phoneNumberConfirmed: tinyint("PhoneNumberConfirmed").notNull(),
	twoFactorEnabled: tinyint("TwoFactorEnabled").notNull(),
	lockoutEndDateUtc: datetime("LockoutEndDateUtc", { mode: 'string' }),
	lockoutEnabled: tinyint("LockoutEnabled").notNull(),
	accessFailedCount: int("AccessFailedCount").notNull(),
	userName: varchar("UserName", { length: 256 }).notNull(),
	companyId: int("CompanyId").notNull(),
	lastModifiedDate: datetime("LastModifiedDate", { mode: 'string' }),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "aspnetusers_Id" }),
	]);

export const brotherinkreports = mysqlTable("brotherinkreports", {
	id: int("Id").autoincrement().notNull(),
	isSynced: tinyint("IsSynced").notNull(),
	job: longtext("Job"),
	printer: longtext("Printer"),
	machineMode: int("MachineMode").notNull(),
	imageFile: longtext("ImageFile"),
	createdDateUtc: datetime("CreatedDateUtc", { mode: 'string' }).notNull(),
	platenSize: longtext("PlatenSize"),
	resolution: int("Resolution").notNull(),
	inkCombination: int("InkCombination").notNull(),
	mode: tinyint("Mode").notNull(),
	highlight: int("Highlight").notNull(),
	mask: int("Mask").notNull(),
	inkVolume: int("InkVolume").notNull(),
	doublePrinting: int("DoublePrinting").notNull(),
	printTime: int("PrintTime").notNull(),
	whiteness: int("Whiteness").notNull(),
	useBackgroundBlackColor: tinyint("UseBackgroundBlackColor").notNull(),
	colorMultiplePassPrinting: tinyint("ColorMultiplePassPrinting").notNull(),
	transparentColor: tinyint("TransparentColor").notNull(),
	colorNameOfTransparentColor: int("ColorNameOfTransparentColor").notNull(),
	tolerance: int("Tolerance").notNull(),
	minWhiteness: int("MinWhiteness").notNull(),
	chokeWidth: int("ChokeWidth").notNull(),
	whiteColorPause: tinyint("WhiteColorPause").notNull(),
	saturation: int("Saturation").notNull(),
	brightness: int("Brightness").notNull(),
	contrast: int("Contrast").notNull(),
	cyanBalance: int("CyanBalance").notNull(),
	magentaBalance: int("MagentaBalance").notNull(),
	yellowBalance: int("YellowBalance").notNull(),
	blackBalance: int("BlackBalance").notNull(),
	uniPrint: tinyint("UniPrint").notNull(),
	colorInkVolume: int("ColorInkVolume").notNull(),
	whiteInkVolume: int("WhiteInkVolume").notNull(),
	copies: int("Copies").notNull(),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "brotherinkreports_Id" }),
		unique("Id").on(table.id),
	]);

export const colorprofileprinters = mysqlTable("colorprofileprinters", {
	id: int("Id").autoincrement().notNull(),
	colorProfileId: int("ColorProfileID").notNull().references(() => colorprofiles.id, { onDelete: "cascade" }),
	printerId: int("PrinterID").notNull(),
	filePath: longtext("FilePath"),
	subfolderPath: longtext("SubfolderPath"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		index("ColorProfileID").on(table.colorProfileId),
		primaryKey({ columns: [table.id], name: "colorprofileprinters_Id" }),
		unique("Id").on(table.id),
	]);

export const colorprofiles = mysqlTable("colorprofiles", {
	id: int("Id").autoincrement().notNull(),
	name: longtext("Name"),
	enabled: tinyint("Enabled").notNull(),
	subFolderPath: longtext("SubFolderPath"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "colorprofiles_Id" }),
		unique("Id").on(table.id),
	]);

export const colours = mysqlTable("colours", {
	colourId: int("ColourId").autoincrement().notNull(),
	name: varchar("Name", { length: 45 }).notNull(),
	code: varchar("Code", { length: 45 }).notNull(),
	manufacturer: varchar("Manufacturer", { length: 45 }).notNull(),
	red: tinyint("Red", { unsigned: true }).notNull(),
	green: tinyint("Green", { unsigned: true }).notNull(),
	blue: tinyint("Blue", { unsigned: true }).notNull(),
	active: tinyint("Active"),
	source: longtext("Source"),
	lastModifiedDate: datetime("LastModifiedDate", { mode: 'string' }),
	cloudColourId: int("CloudColourId"),
	defaultColorProfileId: int("DefaultColorProfileId").references(() => colorprofiles.id),
	colourType: longtext("ColourType"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		index("DefaultColorProfileId").on(table.defaultColorProfileId),
		primaryKey({ columns: [table.colourId], name: "colours_ColourId" }),
		unique("ColourId").on(table.colourId),
	]);

export const designstatisticsv2 = mysqlTable("designstatisticsv2", {
	id: int("Id").autoincrement().notNull(),
	logoId: varchar("LogoId", { length: 255 }).notNull(),
	designWidth: float("DesignWidth").notNull(),
	designHeight: float("DesignHeight").notNull(),
	stitches: int("Stitches").notNull(),
	trims: int("Trims").notNull(),
	recipe: varchar("Recipe", { length: 45 }),
	machineFormat: varchar("MachineFormat", { length: 45 }),
	numElements: int("NumElements").notNull(),
	top: float("Top").notNull(),
	left: float("Left").notNull(),
	orderId: int("OrderId").notNull(),
	needleSequence: int("NeedleSequence").notNull(),
	threads: varchar("Threads", { length: 8000 }).notNull(),
	job: varchar("Job", { length: 255 }).notNull(),
	createdOrUpdatedDate: datetime("CreatedOrUpdatedDate", { mode: 'string' }),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "designstatisticsv2_Id" }),
		unique("Id").on(table.id),
	]);

export const eventlogs = mysqlTable("eventlogs", {
	eventLogId: int("EventLogId").autoincrement().notNull(),
	eventDateTime: datetime("EventDateTime", { mode: 'string' }).notNull(),
	eventType: varchar("EventType", { length: 50 }).notNull(),
	job: varchar("Job", { length: 255 }),
	userId: int("UserId"),
	machineName: varchar("MachineName", { length: 50 }).notNull(),
	resew: tinyint("Resew"),
	numStitches: int("NumStitches"),
	reason: varchar("Reason", { length: 50 }),
	needlesUsed: varchar("NeedlesUsed", { length: 50 }),
	threadBreakHead: int("ThreadBreakHead"),
	threadBreakNeedle: int("ThreadBreakNeedle"),
	numActiveHeads: int("NumActiveHeads"),
	numTotalHeads: int("NumTotalHeads"),
	orderType: varchar("OrderType", { length: 45 }),
	orderNumber: varchar("OrderNumber", { length: 45 }),
	isSync: tinyint("IsSync"),
	productCategoryId: int("ProductCategoryId"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.eventLogId], name: "eventlogs_EventLogId" }),
		unique("EventLogId").on(table.eventLogId),
	]);

export const grouporders = mysqlTable("grouporders", {
	id: int("Id").autoincrement().notNull(),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "grouporders_Id" }),
		unique("Id").on(table.id),
	]);

export const lateboundsewingmessages = mysqlTable("lateboundsewingmessages", {
	lateBoundSewingMessageId: int("LateBoundSewingMessageId").autoincrement().notNull(),
	job: varchar("Job", { length: 255 }).notNull(),
	beforeSewingMessage: varchar("BeforeSewingMessage", { length: 50 }),
	afterSewingMessage: varchar("AfterSewingMessage", { length: 50 }),
	lastModifiedDate: datetime("LastModifiedDate", { mode: 'string' }),
	cloudLateboundSewingMessageId: int("CloudLateboundSewingMessageId"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.lateBoundSewingMessageId], name: "lateboundsewingmessages_LateBoundSewingMessageId" }),
		unique("LateBoundSewingMessageId").on(table.lateBoundSewingMessageId),
	]);

export const machineneedles = mysqlTable("machineneedles", {
	machineNeedleId: int("MachineNeedleId").autoincrement().notNull(),
	machineId: int("MachineId").notNull().references(() => machines.machineId, { onDelete: "cascade" }),
	needleNumber: smallint("NeedleNumber").notNull(),
	colourId: int("ColourId").references(() => colours.colourId),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		index("ColourId").on(table.colourId),
		index("MachineId").on(table.machineId),
		primaryKey({ columns: [table.machineNeedleId], name: "machineneedles_MachineNeedleId" }),
		unique("MachineNeedleId").on(table.machineNeedleId),
	]);

export const machines = mysqlTable("machines", {
	machineId: int("MachineId").autoincrement().notNull(),
	name: varchar("Name", { length: 45 }).notNull(),
	isUseDefaultNeedles: tinyint("IsUseDefaultNeedles").notNull(),
	machineCategory: varchar("MachineCategory", { length: 45 }),
	description: varchar("Description", { length: 45 }),
	possibleStitches: int("PossibleStitches"),
	numberOfHeads: int("NumberOfHeads"),
	lastModifiedDate: datetime("LastModifiedDate", { mode: 'string' }),
	cloudMachineId: int("CloudMachineId"),
	active: tinyint("Active"),
	alias: longtext("Alias"),
	setupTime: double("SetupTime"),
	appliqueStop: double("AppliqueStop"),
	rpm: double("RPM"),
	colourChangeTime: double("ColourChangeTime"),
	trimTime: double("TrimTime"),
	shouldColourize: tinyint("ShouldColourize"),
	isSerial: tinyint("IsSerial"),
	actualMachineName: longtext("ActualMachineName"),
	autoSendToQueue: tinyint("AutoSendToQueue"),
	truncateLength: int("TruncateLength"),
	setNeedles: tinyint("SetNeedles"),
	maxNeedleNumber: smallint("MaxNeedleNumber"),
	isColoreel: tinyint("IsColoreel"),
	coloreelApiUrl: longtext("ColoreelApiUrl"),
	coloreelApiSecret: longtext("ColoreelApiSecret"),
	coloreelUsername: longtext("ColoreelUsername"),
	tajimaConnectUrl: varchar("TajimaConnectUrl", { length: 255 }),
	tajimaConnectUsername: varchar("TajimaConnectUsername", { length: 45 }),
	tajimaConnectPassword: varchar("TajimaConnectPassword", { length: 45 }),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.machineId], name: "machines_MachineId" }),
		unique("MachineId").on(table.machineId),
	]);

export const mcerrorcategories = mysqlTable("mcerrorcategories", {
	mcErrorCategoriesId: int("McErrorCategoriesId").autoincrement().notNull(),
	name: varchar("Name", { length: 45 }).notNull(),
	parentId: int("ParentId"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.mcErrorCategoriesId], name: "mcerrorcategories_McErrorCategoriesId" }),
		unique("McErrorCategoriesId").on(table.mcErrorCategoriesId),
	]);

export const mcerrorcodes = mysqlTable("mcerrorcodes", {
	mcErrorCodeId: int("McErrorCodeId").autoincrement().notNull(),
	code: int("Code").notNull(),
	message: varchar("Message", { length: 300 }).notNull(),
	severity: int("Severity").notNull(),
	categoryId: int("CategoryId").notNull().references(() => mcerrorcategories.mcErrorCategoriesId, { onDelete: "cascade" }),
	parameters: varchar("Parameters", { length: 80 }),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		index("CategoryId").on(table.categoryId),
		primaryKey({ columns: [table.mcErrorCodeId], name: "mcerrorcodes_McErrorCodeId" }),
		unique("McErrorCodeId").on(table.mcErrorCodeId),
	]);

export const mcerrorlog = mysqlTable("mcerrorlog", {
	mcErrorLogId: int("McErrorLogId").autoincrement().notNull(),
	dateTime: datetime("DateTime", { mode: 'string' }).notNull(),
	machineId: int("MachineId").references(() => machines.machineId),
	codeId: int("CodeId").notNull().references(() => mcerrorcodes.mcErrorCodeId, { onDelete: "cascade" }),
	parameters: varchar("Parameters", { length: 80 }),
	isSync: tinyint("IsSync"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		index("CodeId").on(table.codeId),
		index("MachineId").on(table.machineId),
		primaryKey({ columns: [table.mcErrorLogId], name: "mcerrorlog_McErrorLogId" }),
		unique("McErrorLogId").on(table.mcErrorLogId),
	]);

export const mcmachinecategory = mysqlTable("mcmachinecategory", {
	mcMachineCategoryId: int("McMachineCategoryId").autoincrement().notNull(),
	machineId: int("MachineId").notNull(),
	productCategoryId: int("ProductCategoryId").notNull(),
	isSync: tinyint("IsSync"),
},
	(table) => [
		primaryKey({ columns: [table.mcMachineCategoryId], name: "mcmachinecategory_McMachineCategoryId" }),
		unique("McMachineCategoryId").on(table.mcMachineCategoryId),
	]);

export const mcversionings = mysqlTable("mcversionings", {
	versioningId: int("VersioningId").autoincrement().notNull(),
	name: varchar("Name", { length: 300 }).notNull(),
	version: varchar("Version", { length: 300 }).notNull(),
	isSync: tinyint("IsSync"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.versioningId], name: "mcversionings_VersioningId" }),
		unique("VersioningId").on(table.versioningId),
	]);

export const messageofthedays = mysqlTable("messageofthedays", {
	id: int("Id").autoincrement().notNull(),
	startDate: datetime("StartDate", { mode: 'string' }).notNull(),
	endDate: datetime("EndDate", { mode: 'string' }).notNull(),
	message: varchar("Message", { length: 255 }).notNull(),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "messageofthedays_Id" }),
		unique("Id").on(table.id),
	]);

export const needlecolours = mysqlTable("needlecolours", {
	needleColourId: int("NeedleColourId").autoincrement().notNull(),
	needleNumber: smallint("NeedleNumber").notNull(),
	colourId: int("ColourId").references(() => colours.colourId),
	lastModifiedDate: datetime("LastModifiedDate", { mode: 'string' }),
	cloudNeedleColourId: int("CloudNeedleColourId"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		index("ColourId").on(table.colourId),
		primaryKey({ columns: [table.needleColourId], name: "needlecolours_NeedleColourId" }),
		unique("NeedleColourId").on(table.needleColourId),
	]);

export const nestingorders = mysqlTable("nestingorders", {
	id: int("Id").autoincrement().notNull(),
	orderId: int("OrderId").notNull().references(() => orders.orderId, { onDelete: "cascade" }),
	nestingId: int("NestingId").notNull().references(() => nestings.id, { onDelete: "cascade" }),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		index("NestingId").on(table.nestingId),
		index("OrderId").on(table.orderId),
		primaryKey({ columns: [table.id], name: "nestingorders_Id" }),
		unique("Id").on(table.id),
	]);

export const nestings = mysqlTable("nestings", {
	id: int("Id").autoincrement().notNull(),
	releasedDate: datetime("ReleasedDate", { mode: 'string' }).notNull(),
	mediaType: longtext("MediaType"),
	status: longtext("Status"),
	profile: longtext("Profile"),
	automaticProfile: longtext("AutomaticProfile"),
	batchNumber: longtext("BatchNumber"),
	batchUrl: longtext("BatchUrl"),
	batchComments: longtext("BatchComments"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "nestings_Id" }),
		unique("Id").on(table.id),
	]);

export const operators = mysqlTable("operators", {
	operatorId: int("OperatorId").autoincrement().notNull(),
	username: varchar("Username", { length: 45 }).notNull(),
	firstName: varchar("FirstName", { length: 45 }).notNull(),
	lastName: varchar("LastName", { length: 45 }).notNull(),
	isActive: tinyint("IsActive").notNull(),
	emailAddress: longtext("EmailAddress"),
	phoneNumber: longtext("PhoneNumber"),
	supervisorName: longtext("SupervisorName"),
	cannedMessages: longtext("CannedMessages"),
	lastModifiedDate: datetime("LastModifiedDate", { mode: 'string' }),
	cloudOperatorId: int("CloudOperatorId"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.operatorId], name: "operators_OperatorId" }),
		unique("OperatorId").on(table.operatorId),
	]);

export const orderitems = mysqlTable("orderitems", {
	id: int("Id").autoincrement().notNull(),
	orderId: int("OrderId").notNull().references(() => orders.orderId, { onDelete: "cascade" }),
	number: int("Number").notNull(),
	status: longtext("Status"),
	trackingNumber: longtext("TrackingNumber"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		index("OrderId").on(table.orderId),
		primaryKey({ columns: [table.id], name: "orderitems_Id" }),
		unique("Id").on(table.id),
	]);

export const orderjsoninfoes = mysqlTable("orderjsoninfoes", {
	id: int("Id").autoincrement().notNull(),
	orderId: int("OrderId").notNull().references(() => orders.orderId, { onDelete: "cascade" }),
	jsonDetails: longtext("JsonDetails"),
	productViewId: longtext("ProductViewId"),
},
	(table) => [
		index("OrderId").on(table.orderId),
		primaryKey({ columns: [table.id], name: "orderjsoninfoes_Id" }),
		unique("Id").on(table.id),
	]);

export const orders = mysqlTable("orders", {
	orderId: int("OrderId").autoincrement().notNull(),
	job: varchar("Job", { length: 255 }).notNull(),
	workPacketId: bigint("WorkPacketId", { mode: "number" }),
	customerOrderNumber: longtext("CustomerOrderNumber"),
	orderDate: datetime("OrderDate", { mode: 'string' }),
	productCode: longtext("ProductCode"),
	style: longtext("Style"),
	styleName: longtext("StyleName"),
	inputFileName: longtext("InputFileName"),
	namesInGroupingNameTapes: longtext("NamesInGroupingNameTapes"),
	nameTapeEmblemCode: longtext("NameTapeEmblemCode"),
	design: longtext("Design"),
	templateCode: longtext("TemplateCode"),
	templateName: longtext("TemplateName"),
	catalogId: int("CatalogId"),
	templateColourOverride: longtext("TemplateColourOverride"),
	lineSpacingOverride: double("LineSpacingOverride"),
	designSpacingOverride: double("DesignSpacingOverride"),
	primaryColour: longtext("PrimaryColour"),
	secondaryColour: longtext("SecondaryColour"),
	templateFile: longtext("TemplateFile"),
	outputFile: longtext("OutputFile"),
	status: varchar("Status", { length: 45 }).notNull(),
	isBlacklistChecked: tinyint("IsBlacklistChecked").notNull(),
	isManuallyCreated: tinyint("IsManuallyCreated").notNull(),
	createdDate: datetime("CreatedDate", { mode: 'string' }).notNull(),
	shipByDate: datetime("ShipByDate", { mode: 'string' }),
	processedDate: datetime("ProcessedDate", { mode: 'string' }),
	sewingDate: datetime("SewingDate", { mode: 'string' }),
	completedDate: datetime("CompletedDate", { mode: 'string' }),
	isDeleted: tinyint("IsDeleted").notNull(),
	orderType: longtext("OrderType"),
	customerName: longtext("CustomerName"),
	customerGender: longtext("CustomerGender"),
	customerTelNumber: longtext("CustomerTelNumber"),
	customerEmail: longtext("CustomerEmail"),
	customerApiId: int("CustomerApiId").notNull(),
	isEmailSent: tinyint("IsEmailSent"),
	productSize: longtext("ProductSize"),
	cloudOrderId: int("CloudOrderId"),
	lastModifiedDate: datetime("LastModifiedDate", { mode: 'string' }),
	viewId: int("ViewId"),
	viewInfo: longtext("ViewInfo"),
	locId: int("LocId"),
	locInfo: longtext("LocInfo"),
	bundleId: int("BundleId"),
	isPaid: tinyint("IsPaid"),
	productionType: longtext("ProductionType"),
	itemLocation: longtext("ItemLocation"),
	size: longtext("Size"),
	isPrioritized: tinyint("IsPrioritized"),
	loadedToTheClient: longtext("LoadedToTheClient"),
	justification: longtext("Justification"),
	productLocationId: longtext("ProductLocationId"),
	scaleToFit: tinyint("ScaleToFit"),
	locationJustification: longtext("LocationJustification"),
	deliveryConfirmation: longtext("Delivery_Confirmation"),
	backgroundColor: longtext("BackgroundColor"),
	quantity: int("Quantity").notNull(),
	productCategoryName: longtext("ProductCategoryName"),
	message: longtext("Message"),
	templateOverride: longtext("TemplateOverride"),
	maxNumCharacters: int("MaxNumCharacters"),
	barcodeId: longtext("BarcodeID"),
	pathJsonData: longtext("PathJsonData"),
	source: longtext("Source"),
	clientId: longtext("ClientID"),
	batch: longtext("Batch"),
	facility: longtext("Facility"),
	colorTheme: longtext("ColorTheme"),
	isPrintWorksheet: tinyint("IsPrintWorksheet").notNull(),
	originalJobName: longtext("OriginalJobName"),
	storeId: longtext("StoreId"),
	processOrder: longtext("ProcessOrder"),
	marketId: int("MarketId"),
	fulfillmentCenterId: int("FulfillmentCenterId"),
	address: longtext("Address"),
	city: longtext("City"),
	postalCode: longtext("PostalCode"),
	package: longtext("Package"),
	state: longtext("State"),
	address2: longtext("Address2"),
	country: longtext("Country"),
	companyCode: longtext("CompanyCode"),
	color: longtext("Color"),
	customerCode: longtext("CustomerCode"),
	productPreviewUrl: longtext("ProductPreviewURL"),
	productLocation: longtext("ProductLocation"),
	stockLocation: longtext("StockLocation"),
	groupOrderId: int("GroupOrderID").references(() => grouporders.id),
	shippingMethod: longtext("ShippingMethod"),
	fcShippingCode: longtext("FCShippingCode"),
	fcProductCode: longtext("FCProductCode"),
	compositeOrderFileName: longtext("CompositeOrderFileName"),
	carrier: longtext("Carrier"),
	account: longtext("Account"),
	customerCompany: longtext("CustomerCompany"),
	shipBillingMethod: longtext("ShipBillingMethod"),
	shipBillingZipCode: longtext("ShipBillingZipCode"),
	shippingMode: longtext("ShippingMode"),
	preTreatmentCode: longtext("PreTreatmentCode"),
	trackingNumber: longtext("TrackingNumber"),
	shippingLabelUrl: longtext("ShippingLabelURL"),
	productName: longtext("ProductName"),
	productSku: longtext("ProductSKU"),
	salesOrderNumber: longtext("SalesOrderNumber"),
	dateOrdered: datetime("DateOrdered", { mode: 'string' }),
	orderDue: datetime("OrderDue", { mode: 'string' }),
	borderColor: longtext("BorderColor"),
	sku: longtext("SKU"),
	description: longtext("Description"),
	backing: longtext("Backing"),
	fabric: longtext("Fabric"),
	productCategory: longtext("ProductCategory"),
	shelfNumber: longtext("ShelfNumber"),
	notes: longtext("Notes"),
	piecesSewn: int("PiecesSewn"),
	externalId: longtext("ExternalId"),
	onDemandProductSku: longtext("OnDemandProductSKU"),
	threadPalette: longtext("ThreadPalette"),
	userDefinedName: longtext("UserDefinedName"),
	session: longtext("Session"),
	userDisplayedWidth: double("UserDisplayedWidth").notNull(),
	userDisplayedHeight: double("UserDisplayedHeight").notNull(),
	metaData: longtext("MetaData"),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		index("GroupOrderID").on(table.groupOrderId),
		primaryKey({ columns: [table.orderId], name: "orders_OrderId" }),
		unique("OrderId").on(table.orderId),
	]);

export const productelementcolours = mysqlTable("productelementcolours", {
	id: int("Id").autoincrement().notNull(),
	productElementId: int("ProductElementId").notNull().references(() => productelements.id, { onDelete: "cascade" }),
	colourId: int("ColourId").notNull().references(() => colours.colourId, { onDelete: "cascade" }),
},
	(table) => [
		index("ColourId").on(table.colourId),
		index("ProductElementId").on(table.productElementId),
		primaryKey({ columns: [table.id], name: "productelementcolours_Id" }),
		unique("Id").on(table.id),
	]);

export const productelements = mysqlTable("productelements", {
	id: int("Id").autoincrement().notNull(),
	elementName: longtext("ElementName"),
	isAllColors: tinyint("IsAllColors").notNull(),
	productId: int("ProductId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "productelements_Id" }),
		unique("Id").on(table.id),
	]);

export const settings = mysqlTable("settings", {
	id: int("Id").autoincrement().notNull(),
	name: varchar("Name", { length: 80 }),
	value: longtext("Value"),
	companyId: int("CompanyId").notNull(),
	isCompanyDependent: tinyint("IsCompanyDependent"),
	isDirectory: tinyint("IsDirectory"),
	discriminator: varchar("Discriminator", { length: 128 }).notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "settings_Id" }),
		unique("Id").on(table.id),
	]);

export const shifts = mysqlTable("shifts", {
	id: int("Id").autoincrement().notNull(),
	shiftName: varchar("ShiftName", { length: 45 }).notNull(),
	startHour: smallint("StartHour").notNull(),
	startMinute: smallint("StartMinute").notNull(),
	endHour: smallint("EndHour").notNull(),
	endMinute: smallint("EndMinute").notNull(),
	shiftSequence: int("ShiftSequence").notNull(),
	lastModifiedDate: datetime("LastModifiedDate", { mode: 'string' }),
	companyId: int("CompanyId").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.id], name: "shifts_Id" }),
		unique("Id").on(table.id),
	]);

export const stopheads = mysqlTable("stopheads", {
	stopHeadsId: int("StopHeadsId").autoincrement().notNull(),
	eventLogId: int("EventLogId").notNull(),
	heads: varchar("Heads", { length: 200 }),
	breakPosition: int("BreakPosition").notNull(),
},
	(table) => [
		primaryKey({ columns: [table.stopHeadsId], name: "stopheads_StopHeadsId" }),
	]);

export const stylecolors = mysqlTable("stylecolors", {
	id: int("Id").autoincrement().notNull(),
	styleId: int("StyleId"),
	colorId: int("ColorId"),
	colourId: int("Colour_Id").references(() => colours.colourId),
},
	(table) => [
		index("Colour_Id").on(table.colourId),
		primaryKey({ columns: [table.id], name: "stylecolors_Id" }),
		unique("Id").on(table.id),
	]);

export const usermachinefeatures = mysqlTable("usermachinefeatures", {
	id: int("Id").autoincrement().notNull(),
	disabledFeatures: longtext("DisabledFeatures"),
	userId: varchar("UserId", { length: 128 }).notNull().references(() => aspnetusers.id),
},
	(table) => [
		index("UserId").on(table.userId),
		primaryKey({ columns: [table.id], name: "usermachinefeatures_Id" }),
		unique("Id").on(table.id),
	]);

export const workflowaudits = mysqlTable("workflowaudits", {
	id: int("Id").autoincrement().notNull(),
	orderId: int("OrderId").notNull().references(() => orders.orderId, { onDelete: "cascade" }),
	logoPlacement: tinyint("LogoPlacement").notNull(),
	logoStraight: tinyint("LogoStraight").notNull(),
	threadColors: tinyint("ThreadColors").notNull(),
	registration: tinyint("Registration").notNull(),
	completeness: tinyint("Completeness").notNull(),
	looseThread: tinyint("LooseThread").notNull(),
	backing: tinyint("Backing").notNull(),
	noHoles: tinyint("NoHoles").notNull(),
	solvent: tinyint("Solvent").notNull(),
},
	(table) => [
		index("OrderId").on(table.orderId),
		primaryKey({ columns: [table.id], name: "workflowaudits_Id" }),
		unique("Id").on(table.id),
	]);
