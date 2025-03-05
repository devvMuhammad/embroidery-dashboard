import { relations } from "drizzle-orm/relations";
import { aspnetrestrictions, aspnetrolerestrictions, aspnetroles, aspnetusers, aspnetusermachines, machines, aspnetuserroles, colorprofiles, colorprofileprinters, colours, machineneedles, mcerrorcategories, mcerrorcodes, mcerrorlog, needlecolours, orders, nestingorders, nestings, orderitems, orderjsoninfoes, grouporders, productelementcolours, productelements, stylecolors, usermachinefeatures, workflowaudits } from "./schema";

export const aspnetrolerestrictionsRelations = relations(aspnetrolerestrictions, ({one}) => ({
	aspnetrestriction: one(aspnetrestrictions, {
		fields: [aspnetrolerestrictions.restrictionId],
		references: [aspnetrestrictions.id]
	}),
	aspnetrole: one(aspnetroles, {
		fields: [aspnetrolerestrictions.roleId],
		references: [aspnetroles.id]
	}),
}));

export const aspnetrestrictionsRelations = relations(aspnetrestrictions, ({many}) => ({
	aspnetrolerestrictions: many(aspnetrolerestrictions),
}));

export const aspnetrolesRelations = relations(aspnetroles, ({many}) => ({
	aspnetrolerestrictions: many(aspnetrolerestrictions),
	aspnetuserroles: many(aspnetuserroles),
}));

export const aspnetusermachinesRelations = relations(aspnetusermachines, ({one}) => ({
	aspnetuser: one(aspnetusers, {
		fields: [aspnetusermachines.userId],
		references: [aspnetusers.id]
	}),
	machine: one(machines, {
		fields: [aspnetusermachines.machineId],
		references: [machines.machineId]
	}),
}));

export const aspnetusersRelations = relations(aspnetusers, ({many}) => ({
	aspnetusermachines: many(aspnetusermachines),
	aspnetuserroles: many(aspnetuserroles),
	usermachinefeatures: many(usermachinefeatures),
}));

export const machinesRelations = relations(machines, ({many}) => ({
	aspnetusermachines: many(aspnetusermachines),
	machineneedles: many(machineneedles),
	mcerrorlogs: many(mcerrorlog),
}));

export const aspnetuserrolesRelations = relations(aspnetuserroles, ({one}) => ({
	aspnetrole: one(aspnetroles, {
		fields: [aspnetuserroles.roleId],
		references: [aspnetroles.id]
	}),
	aspnetuser: one(aspnetusers, {
		fields: [aspnetuserroles.userId],
		references: [aspnetusers.id]
	}),
}));

export const colorprofileprintersRelations = relations(colorprofileprinters, ({one}) => ({
	colorprofile: one(colorprofiles, {
		fields: [colorprofileprinters.colorProfileId],
		references: [colorprofiles.id]
	}),
}));

export const colorprofilesRelations = relations(colorprofiles, ({many}) => ({
	colorprofileprinters: many(colorprofileprinters),
	colours: many(colours),
}));

export const coloursRelations = relations(colours, ({one, many}) => ({
	colorprofile: one(colorprofiles, {
		fields: [colours.defaultColorProfileId],
		references: [colorprofiles.id]
	}),
	machineneedles: many(machineneedles),
	needlecolours: many(needlecolours),
	productelementcolours: many(productelementcolours),
	stylecolors: many(stylecolors),
}));

export const machineneedlesRelations = relations(machineneedles, ({one}) => ({
	colour: one(colours, {
		fields: [machineneedles.colourId],
		references: [colours.colourId]
	}),
	machine: one(machines, {
		fields: [machineneedles.machineId],
		references: [machines.machineId]
	}),
}));

export const mcerrorcodesRelations = relations(mcerrorcodes, ({one, many}) => ({
	mcerrorcategory: one(mcerrorcategories, {
		fields: [mcerrorcodes.categoryId],
		references: [mcerrorcategories.mcErrorCategoriesId]
	}),
	mcerrorlogs: many(mcerrorlog),
}));

export const mcerrorcategoriesRelations = relations(mcerrorcategories, ({many}) => ({
	mcerrorcodes: many(mcerrorcodes),
}));

export const mcerrorlogRelations = relations(mcerrorlog, ({one}) => ({
	mcerrorcode: one(mcerrorcodes, {
		fields: [mcerrorlog.codeId],
		references: [mcerrorcodes.mcErrorCodeId]
	}),
	machine: one(machines, {
		fields: [mcerrorlog.machineId],
		references: [machines.machineId]
	}),
}));

export const needlecoloursRelations = relations(needlecolours, ({one}) => ({
	colour: one(colours, {
		fields: [needlecolours.colourId],
		references: [colours.colourId]
	}),
}));

export const nestingordersRelations = relations(nestingorders, ({one}) => ({
	order: one(orders, {
		fields: [nestingorders.orderId],
		references: [orders.orderId]
	}),
	nesting: one(nestings, {
		fields: [nestingorders.nestingId],
		references: [nestings.id]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	nestingorders: many(nestingorders),
	orderitems: many(orderitems),
	orderjsoninfoes: many(orderjsoninfoes),
	grouporder: one(grouporders, {
		fields: [orders.groupOrderId],
		references: [grouporders.id]
	}),
	workflowaudits: many(workflowaudits),
}));

export const nestingsRelations = relations(nestings, ({many}) => ({
	nestingorders: many(nestingorders),
}));

export const orderitemsRelations = relations(orderitems, ({one}) => ({
	order: one(orders, {
		fields: [orderitems.orderId],
		references: [orders.orderId]
	}),
}));

export const orderjsoninfoesRelations = relations(orderjsoninfoes, ({one}) => ({
	order: one(orders, {
		fields: [orderjsoninfoes.orderId],
		references: [orders.orderId]
	}),
}));

export const groupordersRelations = relations(grouporders, ({many}) => ({
	orders: many(orders),
}));

export const productelementcoloursRelations = relations(productelementcolours, ({one}) => ({
	colour: one(colours, {
		fields: [productelementcolours.colourId],
		references: [colours.colourId]
	}),
	productelement: one(productelements, {
		fields: [productelementcolours.productElementId],
		references: [productelements.id]
	}),
}));

export const productelementsRelations = relations(productelements, ({many}) => ({
	productelementcolours: many(productelementcolours),
}));

export const stylecolorsRelations = relations(stylecolors, ({one}) => ({
	colour: one(colours, {
		fields: [stylecolors.colourId],
		references: [colours.colourId]
	}),
}));

export const usermachinefeaturesRelations = relations(usermachinefeatures, ({one}) => ({
	aspnetuser: one(aspnetusers, {
		fields: [usermachinefeatures.userId],
		references: [aspnetusers.id]
	}),
}));

export const workflowauditsRelations = relations(workflowaudits, ({one}) => ({
	order: one(orders, {
		fields: [workflowaudits.orderId],
		references: [orders.orderId]
	}),
}));