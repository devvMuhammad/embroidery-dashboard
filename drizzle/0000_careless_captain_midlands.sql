-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `__migrationhistory` (
	`Migration_ID` varchar(100) NOT NULL,
	`Context_Key` varchar(200) NOT NULL,
	`Model` longblob NOT NULL,
	`ProductVersion` varchar(32) NOT NULL,
	CONSTRAINT `__migrationhistory_Migration_ID_Context_Key` PRIMARY KEY(`Migration_ID`,`Context_Key`)
);
--> statement-breakpoint
CREATE TABLE `aspnetrestrictions` (
	`Id` varchar(128) NOT NULL,
	`Resource` varchar(256) NOT NULL,
	`Restriction` varchar(256) NOT NULL,
	`Selected` tinyint(1),
	`Discriminator` varchar(128) NOT NULL,
	CONSTRAINT `aspnetrestrictions_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `aspnetrolerestrictions` (
	`RoleId` varchar(128) NOT NULL,
	`RestrictionId` varchar(128) NOT NULL,
	CONSTRAINT `aspnetrolerestrictions_RoleId_RestrictionId` PRIMARY KEY(`RoleId`,`RestrictionId`)
);
--> statement-breakpoint
CREATE TABLE `aspnetroles` (
	`Id` varchar(128) NOT NULL,
	`Name` varchar(256) NOT NULL,
	`IsSystemProtected` tinyint(1) NOT NULL,
	`CompanyId` int NOT NULL,
	CONSTRAINT `aspnetroles_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `aspnetusermachines` (
	`UserId` varchar(128) NOT NULL,
	`MachineId` int NOT NULL,
	CONSTRAINT `aspnetusermachines_UserId_MachineId` PRIMARY KEY(`UserId`,`MachineId`)
);
--> statement-breakpoint
CREATE TABLE `aspnetuserroles` (
	`UserId` varchar(128) NOT NULL,
	`RoleId` varchar(128) NOT NULL,
	CONSTRAINT `aspnetuserroles_UserId_RoleId` PRIMARY KEY(`UserId`,`RoleId`)
);
--> statement-breakpoint
CREATE TABLE `aspnetusers` (
	`Id` varchar(128) NOT NULL,
	`Email` varchar(256),
	`EmailConfirmed` tinyint(1) NOT NULL,
	`PasswordHash` longtext,
	`SecurityStamp` longtext,
	`PhoneNumber` longtext,
	`PhoneNumberConfirmed` tinyint(1) NOT NULL,
	`TwoFactorEnabled` tinyint(1) NOT NULL,
	`LockoutEndDateUtc` datetime,
	`LockoutEnabled` tinyint(1) NOT NULL,
	`AccessFailedCount` int NOT NULL,
	`UserName` varchar(256) NOT NULL,
	`CompanyId` int NOT NULL,
	`LastModifiedDate` datetime,
	CONSTRAINT `aspnetusers_Id` PRIMARY KEY(`Id`)
);
--> statement-breakpoint
CREATE TABLE `brotherinkreports` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`IsSynced` tinyint(1) NOT NULL,
	`Job` longtext,
	`Printer` longtext,
	`MachineMode` int NOT NULL,
	`ImageFile` longtext,
	`CreatedDateUtc` datetime NOT NULL,
	`PlatenSize` longtext,
	`Resolution` int NOT NULL,
	`InkCombination` int NOT NULL,
	`Mode` tinyint(1) NOT NULL,
	`Highlight` int NOT NULL,
	`Mask` int NOT NULL,
	`InkVolume` int NOT NULL,
	`DoublePrinting` int NOT NULL,
	`PrintTime` int NOT NULL,
	`Whiteness` int NOT NULL,
	`UseBackgroundBlackColor` tinyint(1) NOT NULL,
	`ColorMultiplePassPrinting` tinyint(1) NOT NULL,
	`TransparentColor` tinyint(1) NOT NULL,
	`ColorNameOfTransparentColor` int NOT NULL,
	`Tolerance` int NOT NULL,
	`MinWhiteness` int NOT NULL,
	`ChokeWidth` int NOT NULL,
	`WhiteColorPause` tinyint(1) NOT NULL,
	`Saturation` int NOT NULL,
	`Brightness` int NOT NULL,
	`Contrast` int NOT NULL,
	`CyanBalance` int NOT NULL,
	`MagentaBalance` int NOT NULL,
	`YellowBalance` int NOT NULL,
	`BlackBalance` int NOT NULL,
	`UniPrint` tinyint(1) NOT NULL,
	`ColorInkVolume` int NOT NULL,
	`WhiteInkVolume` int NOT NULL,
	`Copies` int NOT NULL,
	`CompanyId` int NOT NULL,
	CONSTRAINT `brotherinkreports_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `colorprofileprinters` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`ColorProfileID` int NOT NULL,
	`PrinterID` int NOT NULL,
	`FilePath` longtext,
	`SubfolderPath` longtext,
	`CompanyId` int NOT NULL,
	CONSTRAINT `colorprofileprinters_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `colorprofiles` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Name` longtext,
	`Enabled` tinyint(1) NOT NULL,
	`SubFolderPath` longtext,
	`CompanyId` int NOT NULL,
	CONSTRAINT `colorprofiles_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `colours` (
	`ColourId` int AUTO_INCREMENT NOT NULL,
	`Name` varchar(45) NOT NULL,
	`Code` varchar(45) NOT NULL,
	`Manufacturer` varchar(45) NOT NULL,
	`Red` tinyint unsigned NOT NULL,
	`Green` tinyint unsigned NOT NULL,
	`Blue` tinyint unsigned NOT NULL,
	`Active` tinyint(1),
	`Source` longtext,
	`LastModifiedDate` datetime,
	`CloudColourId` int,
	`DefaultColorProfileId` int,
	`ColourType` longtext,
	`CompanyId` int NOT NULL,
	CONSTRAINT `colours_ColourId` PRIMARY KEY(`ColourId`),
	CONSTRAINT `ColourId` UNIQUE(`ColourId`)
);
--> statement-breakpoint
CREATE TABLE `designstatisticsv2` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`LogoId` varchar(255) NOT NULL,
	`DesignWidth` float NOT NULL,
	`DesignHeight` float NOT NULL,
	`Stitches` int NOT NULL,
	`Trims` int NOT NULL,
	`Recipe` varchar(45),
	`MachineFormat` varchar(45),
	`NumElements` int NOT NULL,
	`Top` float NOT NULL,
	`Left` float NOT NULL,
	`OrderId` int NOT NULL,
	`NeedleSequence` int NOT NULL,
	`Threads` varchar(8000) NOT NULL,
	`Job` varchar(255) NOT NULL,
	`CreatedOrUpdatedDate` datetime,
	`CompanyId` int NOT NULL,
	CONSTRAINT `designstatisticsv2_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `eventlogs` (
	`EventLogId` int AUTO_INCREMENT NOT NULL,
	`EventDateTime` datetime NOT NULL,
	`EventType` varchar(50) NOT NULL,
	`Job` varchar(255),
	`UserId` int,
	`MachineName` varchar(50) NOT NULL,
	`Resew` tinyint(1),
	`NumStitches` int,
	`Reason` varchar(50),
	`NeedlesUsed` varchar(50),
	`ThreadBreakHead` int,
	`ThreadBreakNeedle` int,
	`NumActiveHeads` int,
	`NumTotalHeads` int,
	`OrderType` varchar(45),
	`OrderNumber` varchar(45),
	`IsSync` tinyint(1),
	`ProductCategoryId` int,
	`CompanyId` int NOT NULL,
	CONSTRAINT `eventlogs_EventLogId` PRIMARY KEY(`EventLogId`),
	CONSTRAINT `EventLogId` UNIQUE(`EventLogId`)
);
--> statement-breakpoint
CREATE TABLE `grouporders` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`CompanyId` int NOT NULL,
	CONSTRAINT `grouporders_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `lateboundsewingmessages` (
	`LateBoundSewingMessageId` int AUTO_INCREMENT NOT NULL,
	`Job` varchar(255) NOT NULL,
	`BeforeSewingMessage` varchar(50),
	`AfterSewingMessage` varchar(50),
	`LastModifiedDate` datetime,
	`CloudLateboundSewingMessageId` int,
	`CompanyId` int NOT NULL,
	CONSTRAINT `lateboundsewingmessages_LateBoundSewingMessageId` PRIMARY KEY(`LateBoundSewingMessageId`),
	CONSTRAINT `LateBoundSewingMessageId` UNIQUE(`LateBoundSewingMessageId`)
);
--> statement-breakpoint
CREATE TABLE `machineneedles` (
	`MachineNeedleId` int AUTO_INCREMENT NOT NULL,
	`MachineId` int NOT NULL,
	`NeedleNumber` smallint NOT NULL,
	`ColourId` int,
	`CompanyId` int NOT NULL,
	CONSTRAINT `machineneedles_MachineNeedleId` PRIMARY KEY(`MachineNeedleId`),
	CONSTRAINT `MachineNeedleId` UNIQUE(`MachineNeedleId`)
);
--> statement-breakpoint
CREATE TABLE `machines` (
	`MachineId` int AUTO_INCREMENT NOT NULL,
	`Name` varchar(45) NOT NULL,
	`IsUseDefaultNeedles` tinyint(1) NOT NULL,
	`MachineCategory` varchar(45),
	`Description` varchar(45),
	`PossibleStitches` int,
	`NumberOfHeads` int,
	`LastModifiedDate` datetime,
	`CloudMachineId` int,
	`Active` tinyint(1),
	`Alias` longtext,
	`SetupTime` double,
	`AppliqueStop` double,
	`RPM` double,
	`ColourChangeTime` double,
	`TrimTime` double,
	`ShouldColourize` tinyint(1),
	`IsSerial` tinyint(1),
	`ActualMachineName` longtext,
	`AutoSendToQueue` tinyint(1),
	`TruncateLength` int,
	`SetNeedles` tinyint(1),
	`MaxNeedleNumber` smallint,
	`IsColoreel` tinyint(1),
	`ColoreelApiUrl` longtext,
	`ColoreelApiSecret` longtext,
	`ColoreelUsername` longtext,
	`TajimaConnectUrl` varchar(255),
	`TajimaConnectUsername` varchar(45),
	`TajimaConnectPassword` varchar(45),
	`CompanyId` int NOT NULL,
	CONSTRAINT `machines_MachineId` PRIMARY KEY(`MachineId`),
	CONSTRAINT `MachineId` UNIQUE(`MachineId`)
);
--> statement-breakpoint
CREATE TABLE `mcerrorcategories` (
	`McErrorCategoriesId` int AUTO_INCREMENT NOT NULL,
	`Name` varchar(45) NOT NULL,
	`ParentId` int,
	`CompanyId` int NOT NULL,
	CONSTRAINT `mcerrorcategories_McErrorCategoriesId` PRIMARY KEY(`McErrorCategoriesId`),
	CONSTRAINT `McErrorCategoriesId` UNIQUE(`McErrorCategoriesId`)
);
--> statement-breakpoint
CREATE TABLE `mcerrorcodes` (
	`McErrorCodeId` int AUTO_INCREMENT NOT NULL,
	`Code` int NOT NULL,
	`Message` varchar(300) NOT NULL,
	`Severity` int NOT NULL,
	`CategoryId` int NOT NULL,
	`Parameters` varchar(80),
	`CompanyId` int NOT NULL,
	CONSTRAINT `mcerrorcodes_McErrorCodeId` PRIMARY KEY(`McErrorCodeId`),
	CONSTRAINT `McErrorCodeId` UNIQUE(`McErrorCodeId`)
);
--> statement-breakpoint
CREATE TABLE `mcerrorlog` (
	`McErrorLogId` int AUTO_INCREMENT NOT NULL,
	`DateTime` datetime NOT NULL,
	`MachineId` int,
	`CodeId` int NOT NULL,
	`Parameters` varchar(80),
	`IsSync` tinyint(1),
	`CompanyId` int NOT NULL,
	CONSTRAINT `mcerrorlog_McErrorLogId` PRIMARY KEY(`McErrorLogId`),
	CONSTRAINT `McErrorLogId` UNIQUE(`McErrorLogId`)
);
--> statement-breakpoint
CREATE TABLE `mcmachinecategory` (
	`McMachineCategoryId` int AUTO_INCREMENT NOT NULL,
	`MachineId` int NOT NULL,
	`ProductCategoryId` int NOT NULL,
	`IsSync` tinyint(1),
	CONSTRAINT `mcmachinecategory_McMachineCategoryId` PRIMARY KEY(`McMachineCategoryId`),
	CONSTRAINT `McMachineCategoryId` UNIQUE(`McMachineCategoryId`)
);
--> statement-breakpoint
CREATE TABLE `mcversionings` (
	`VersioningId` int AUTO_INCREMENT NOT NULL,
	`Name` varchar(300) NOT NULL,
	`Version` varchar(300) NOT NULL,
	`IsSync` tinyint(1),
	`CompanyId` int NOT NULL,
	CONSTRAINT `mcversionings_VersioningId` PRIMARY KEY(`VersioningId`),
	CONSTRAINT `VersioningId` UNIQUE(`VersioningId`)
);
--> statement-breakpoint
CREATE TABLE `messageofthedays` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`StartDate` datetime NOT NULL,
	`EndDate` datetime NOT NULL,
	`Message` varchar(255) NOT NULL,
	`CompanyId` int NOT NULL,
	CONSTRAINT `messageofthedays_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `needlecolours` (
	`NeedleColourId` int AUTO_INCREMENT NOT NULL,
	`NeedleNumber` smallint NOT NULL,
	`ColourId` int,
	`LastModifiedDate` datetime,
	`CloudNeedleColourId` int,
	`CompanyId` int NOT NULL,
	CONSTRAINT `needlecolours_NeedleColourId` PRIMARY KEY(`NeedleColourId`),
	CONSTRAINT `NeedleColourId` UNIQUE(`NeedleColourId`)
);
--> statement-breakpoint
CREATE TABLE `nestingorders` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`OrderId` int NOT NULL,
	`NestingId` int NOT NULL,
	`CompanyId` int NOT NULL,
	CONSTRAINT `nestingorders_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `nestings` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`ReleasedDate` datetime NOT NULL,
	`MediaType` longtext,
	`Status` longtext,
	`Profile` longtext,
	`AutomaticProfile` longtext,
	`BatchNumber` longtext,
	`BatchUrl` longtext,
	`BatchComments` longtext,
	`CompanyId` int NOT NULL,
	CONSTRAINT `nestings_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `operators` (
	`OperatorId` int AUTO_INCREMENT NOT NULL,
	`Username` varchar(45) NOT NULL,
	`FirstName` varchar(45) NOT NULL,
	`LastName` varchar(45) NOT NULL,
	`IsActive` tinyint(1) NOT NULL,
	`EmailAddress` longtext,
	`PhoneNumber` longtext,
	`SupervisorName` longtext,
	`CannedMessages` longtext,
	`LastModifiedDate` datetime,
	`CloudOperatorId` int,
	`CompanyId` int NOT NULL,
	CONSTRAINT `operators_OperatorId` PRIMARY KEY(`OperatorId`),
	CONSTRAINT `OperatorId` UNIQUE(`OperatorId`)
);
--> statement-breakpoint
CREATE TABLE `orderitems` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`OrderId` int NOT NULL,
	`Number` int NOT NULL,
	`Status` longtext,
	`TrackingNumber` longtext,
	`CompanyId` int NOT NULL,
	CONSTRAINT `orderitems_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `orderjsoninfoes` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`OrderId` int NOT NULL,
	`JsonDetails` longtext,
	`ProductViewId` longtext,
	CONSTRAINT `orderjsoninfoes_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`OrderId` int AUTO_INCREMENT NOT NULL,
	`Job` varchar(255) NOT NULL,
	`WorkPacketId` bigint,
	`CustomerOrderNumber` longtext,
	`OrderDate` datetime,
	`ProductCode` longtext,
	`Style` longtext,
	`StyleName` longtext,
	`InputFileName` longtext,
	`NamesInGroupingNameTapes` longtext,
	`NameTapeEmblemCode` longtext,
	`Design` longtext,
	`TemplateCode` longtext,
	`TemplateName` longtext,
	`CatalogId` int,
	`TemplateColourOverride` longtext,
	`LineSpacingOverride` double,
	`DesignSpacingOverride` double,
	`PrimaryColour` longtext,
	`SecondaryColour` longtext,
	`TemplateFile` longtext,
	`OutputFile` longtext,
	`Status` varchar(45) NOT NULL,
	`IsBlacklistChecked` tinyint(1) NOT NULL,
	`IsManuallyCreated` tinyint(1) NOT NULL,
	`CreatedDate` datetime NOT NULL,
	`ShipByDate` datetime,
	`ProcessedDate` datetime,
	`SewingDate` datetime,
	`CompletedDate` datetime,
	`IsDeleted` tinyint(1) NOT NULL,
	`OrderType` longtext,
	`CustomerName` longtext,
	`CustomerGender` longtext,
	`CustomerTelNumber` longtext,
	`CustomerEmail` longtext,
	`CustomerApiId` int NOT NULL,
	`IsEmailSent` tinyint(1),
	`ProductSize` longtext,
	`CloudOrderId` int,
	`LastModifiedDate` datetime,
	`ViewId` int,
	`ViewInfo` longtext,
	`LocId` int,
	`LocInfo` longtext,
	`BundleId` int,
	`IsPaid` tinyint(1),
	`ProductionType` longtext,
	`ItemLocation` longtext,
	`Size` longtext,
	`IsPrioritized` tinyint(1),
	`LoadedToTheClient` longtext,
	`Justification` longtext,
	`ProductLocationId` longtext,
	`ScaleToFit` tinyint(1),
	`LocationJustification` longtext,
	`Delivery_Confirmation` longtext,
	`BackgroundColor` longtext,
	`Quantity` int NOT NULL,
	`ProductCategoryName` longtext,
	`Message` longtext,
	`TemplateOverride` longtext,
	`MaxNumCharacters` int,
	`BarcodeID` longtext,
	`PathJsonData` longtext,
	`Source` longtext,
	`ClientID` longtext,
	`Batch` longtext,
	`Facility` longtext,
	`ColorTheme` longtext,
	`IsPrintWorksheet` tinyint(1) NOT NULL,
	`OriginalJobName` longtext,
	`StoreId` longtext,
	`ProcessOrder` longtext,
	`MarketId` int,
	`FulfillmentCenterId` int,
	`Address` longtext,
	`City` longtext,
	`PostalCode` longtext,
	`Package` longtext,
	`State` longtext,
	`Address2` longtext,
	`Country` longtext,
	`CompanyCode` longtext,
	`Color` longtext,
	`CustomerCode` longtext,
	`ProductPreviewURL` longtext,
	`ProductLocation` longtext,
	`StockLocation` longtext,
	`GroupOrderID` int,
	`ShippingMethod` longtext,
	`FCShippingCode` longtext,
	`FCProductCode` longtext,
	`CompositeOrderFileName` longtext,
	`Carrier` longtext,
	`Account` longtext,
	`CustomerCompany` longtext,
	`ShipBillingMethod` longtext,
	`ShipBillingZipCode` longtext,
	`ShippingMode` longtext,
	`PreTreatmentCode` longtext,
	`TrackingNumber` longtext,
	`ShippingLabelURL` longtext,
	`ProductName` longtext,
	`ProductSKU` longtext,
	`SalesOrderNumber` longtext,
	`DateOrdered` datetime,
	`OrderDue` datetime,
	`BorderColor` longtext,
	`SKU` longtext,
	`Description` longtext,
	`Backing` longtext,
	`Fabric` longtext,
	`ProductCategory` longtext,
	`ShelfNumber` longtext,
	`Notes` longtext,
	`PiecesSewn` int,
	`ExternalId` longtext,
	`OnDemandProductSKU` longtext,
	`ThreadPalette` longtext,
	`UserDefinedName` longtext,
	`Session` longtext,
	`UserDisplayedWidth` double NOT NULL,
	`UserDisplayedHeight` double NOT NULL,
	`MetaData` longtext,
	`CompanyId` int NOT NULL,
	CONSTRAINT `orders_OrderId` PRIMARY KEY(`OrderId`),
	CONSTRAINT `OrderId` UNIQUE(`OrderId`)
);
--> statement-breakpoint
CREATE TABLE `productelementcolours` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`ProductElementId` int NOT NULL,
	`ColourId` int NOT NULL,
	CONSTRAINT `productelementcolours_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `productelements` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`ElementName` longtext,
	`IsAllColors` tinyint(1) NOT NULL,
	`ProductId` int NOT NULL,
	CONSTRAINT `productelements_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`Name` varchar(80),
	`Value` longtext,
	`CompanyId` int NOT NULL,
	`IsCompanyDependent` tinyint(1),
	`IsDirectory` tinyint(1),
	`Discriminator` varchar(128) NOT NULL,
	CONSTRAINT `settings_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `shifts` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`ShiftName` varchar(45) NOT NULL,
	`StartHour` smallint NOT NULL,
	`StartMinute` smallint NOT NULL,
	`EndHour` smallint NOT NULL,
	`EndMinute` smallint NOT NULL,
	`ShiftSequence` int NOT NULL,
	`LastModifiedDate` datetime,
	`CompanyId` int NOT NULL,
	CONSTRAINT `shifts_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `stopheads` (
	`StopHeadsId` int AUTO_INCREMENT NOT NULL,
	`EventLogId` int NOT NULL,
	`Heads` varchar(200),
	`BreakPosition` int NOT NULL,
	CONSTRAINT `stopheads_StopHeadsId` PRIMARY KEY(`StopHeadsId`)
);
--> statement-breakpoint
CREATE TABLE `stylecolors` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`StyleId` int,
	`ColorId` int,
	`Colour_Id` int,
	CONSTRAINT `stylecolors_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `usermachinefeatures` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`DisabledFeatures` longtext,
	`UserId` varchar(128) NOT NULL,
	CONSTRAINT `usermachinefeatures_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
CREATE TABLE `workflowaudits` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`OrderId` int NOT NULL,
	`LogoPlacement` tinyint(1) NOT NULL,
	`LogoStraight` tinyint(1) NOT NULL,
	`ThreadColors` tinyint(1) NOT NULL,
	`Registration` tinyint(1) NOT NULL,
	`Completeness` tinyint(1) NOT NULL,
	`LooseThread` tinyint(1) NOT NULL,
	`Backing` tinyint(1) NOT NULL,
	`NoHoles` tinyint(1) NOT NULL,
	`Solvent` tinyint(1) NOT NULL,
	CONSTRAINT `workflowaudits_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Id` UNIQUE(`Id`)
);
--> statement-breakpoint
ALTER TABLE `aspnetrolerestrictions` ADD CONSTRAINT `IdentityRestriction_Roles` FOREIGN KEY (`RestrictionId`) REFERENCES `aspnetrestrictions`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `aspnetrolerestrictions` ADD CONSTRAINT `IdentityRole_Restrictions` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `aspnetusermachines` ADD CONSTRAINT `IdentityUser_Machines_Source` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `aspnetusermachines` ADD CONSTRAINT `IdentityUser_Machines_Target` FOREIGN KEY (`MachineId`) REFERENCES `machines`(`MachineId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `aspnetuserroles` ADD CONSTRAINT `IdentityRole_Users` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `aspnetuserroles` ADD CONSTRAINT `IdentityUser_Roles` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `colorprofileprinters` ADD CONSTRAINT `ColorProfilePrinter_ColorProfile` FOREIGN KEY (`ColorProfileID`) REFERENCES `colorprofiles`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `colours` ADD CONSTRAINT `ColorProfile_Colours` FOREIGN KEY (`DefaultColorProfileId`) REFERENCES `colorprofiles`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `machineneedles` ADD CONSTRAINT `MachineNeedle_Colour` FOREIGN KEY (`ColourId`) REFERENCES `colours`(`ColourId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `machineneedles` ADD CONSTRAINT `Machine_MachineNeedles` FOREIGN KEY (`MachineId`) REFERENCES `machines`(`MachineId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mcerrorcodes` ADD CONSTRAINT `McErrorCodes_Category` FOREIGN KEY (`CategoryId`) REFERENCES `mcerrorcategories`(`McErrorCategoriesId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mcerrorlog` ADD CONSTRAINT `McErrorLog_Code` FOREIGN KEY (`CodeId`) REFERENCES `mcerrorcodes`(`McErrorCodeId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mcerrorlog` ADD CONSTRAINT `McErrorLog_Machine` FOREIGN KEY (`MachineId`) REFERENCES `machines`(`MachineId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `needlecolours` ADD CONSTRAINT `NeedleColour_Colour` FOREIGN KEY (`ColourId`) REFERENCES `colours`(`ColourId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `nestingorders` ADD CONSTRAINT `NestingOrder_Order` FOREIGN KEY (`OrderId`) REFERENCES `orders`(`OrderId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `nestingorders` ADD CONSTRAINT `Nesting_NestingOrders` FOREIGN KEY (`NestingId`) REFERENCES `nestings`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderitems` ADD CONSTRAINT `OrderItem_Order` FOREIGN KEY (`OrderId`) REFERENCES `orders`(`OrderId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderjsoninfoes` ADD CONSTRAINT `OrderJsonInfo_Order` FOREIGN KEY (`OrderId`) REFERENCES `orders`(`OrderId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `GroupOrder_Orders` FOREIGN KEY (`GroupOrderID`) REFERENCES `grouporders`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `productelementcolours` ADD CONSTRAINT `ProductElementColour_Colour` FOREIGN KEY (`ColourId`) REFERENCES `colours`(`ColourId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `productelementcolours` ADD CONSTRAINT `ProductElement_ProductElementColours` FOREIGN KEY (`ProductElementId`) REFERENCES `productelements`(`Id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stylecolors` ADD CONSTRAINT `StyleColor_Colour` FOREIGN KEY (`Colour_Id`) REFERENCES `colours`(`ColourId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usermachinefeatures` ADD CONSTRAINT `IdentityUser_DisabledFeatures` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `workflowaudits` ADD CONSTRAINT `WorkflowAudit_Orders` FOREIGN KEY (`OrderId`) REFERENCES `orders`(`OrderId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `ColorProfileID` ON `colorprofileprinters` (`ColorProfileID`);--> statement-breakpoint
CREATE INDEX `DefaultColorProfileId` ON `colours` (`DefaultColorProfileId`);--> statement-breakpoint
CREATE INDEX `ColourId` ON `machineneedles` (`ColourId`);--> statement-breakpoint
CREATE INDEX `MachineId` ON `machineneedles` (`MachineId`);--> statement-breakpoint
CREATE INDEX `CategoryId` ON `mcerrorcodes` (`CategoryId`);--> statement-breakpoint
CREATE INDEX `CodeId` ON `mcerrorlog` (`CodeId`);--> statement-breakpoint
CREATE INDEX `MachineId` ON `mcerrorlog` (`MachineId`);--> statement-breakpoint
CREATE INDEX `ColourId` ON `needlecolours` (`ColourId`);--> statement-breakpoint
CREATE INDEX `NestingId` ON `nestingorders` (`NestingId`);--> statement-breakpoint
CREATE INDEX `OrderId` ON `nestingorders` (`OrderId`);--> statement-breakpoint
CREATE INDEX `OrderId` ON `orderitems` (`OrderId`);--> statement-breakpoint
CREATE INDEX `OrderId` ON `orderjsoninfoes` (`OrderId`);--> statement-breakpoint
CREATE INDEX `GroupOrderID` ON `orders` (`GroupOrderID`);--> statement-breakpoint
CREATE INDEX `ColourId` ON `productelementcolours` (`ColourId`);--> statement-breakpoint
CREATE INDEX `ProductElementId` ON `productelementcolours` (`ProductElementId`);--> statement-breakpoint
CREATE INDEX `Colour_Id` ON `stylecolors` (`Colour_Id`);--> statement-breakpoint
CREATE INDEX `UserId` ON `usermachinefeatures` (`UserId`);--> statement-breakpoint
CREATE INDEX `OrderId` ON `workflowaudits` (`OrderId`);
*/