const baseURL={
	user:process.env.VUE_APP_UMC_BASE_API,
	rac:process.env.VUE_APP_RAC_BASE_API,
	portal:process.env.VUE_APP_PORTAL_BASE_API,
}
baseURL.formheader = {
	'Accept': 'application/json',
	'Content-Type': 'application/x-www-form-urlencoded'
}
baseURL.jsonheader = {
	'Accept': 'application/json',
	'Content-Type': 'application/json; charset=utf-8'
}
export default baseURL;
