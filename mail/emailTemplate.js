
function newUser (firstName, lastName, secret) {
  return (`
		<td>
		<!--[if mso]>
		<center>
		<table><tr><td width="600">
		<![endif]-->
		<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
		<tbody><tr>
			<td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
		<tbody><tr>
		<td role="module-content">
		<p></p>
		</td>
		</tr>
		</tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b0dd0656-23ce-4f1f-a7d3-abfa2ee728d1" data-mc-module-version="2019-10-22">
		<tbody>
		<tr>
		<td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Hello ${firstName} ${lastName}. Welcome to Social Circle! ***Some sort of description about the app***</div><div></div></div></td>
		</tr>
		</tbody>
		</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="fe95eefa-f9d6-4aec-8158-0ae968eca884" data-mc-module-version="2019-10-22">
		<tbody>
		<tr>
		<td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-family: arial, helvetica, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline">Below is your personalized link that will take you to your account. Please use this link to access your account in the future.&nbsp;</span>&nbsp;</div><div></div></div></td>
		</tr>
		</tbody>
		</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="657513d6-aa73-40b7-9f26-2783715fdb4c" data-mc-module-version="2019-10-22">
		<tbody>
		<tr>
		<td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><a href="https://social-circle.herokuapp.com/">Link</a></div><div></div></div></td>
		</tr>
		</tbody>
		</table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-size:12px; line-height:20px;">{{Sender_Name}}</p><p style="font-size:12px; line-height:20px;"><span class="Unsubscribe--senderAddress">{{Sender_Address}}</span>, <span class="Unsubscribe--senderCity">{{Sender_City}}</span>, <span class="Unsubscribe--senderState">{{Sender_State}}</span> <span class="Unsubscribe--senderZip">{{Sender_Zip}}</span></p></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
		</tr>
		</tbody></table>
		<!--[if mso]>
		</td>
		</tr>
		</table>
		</center>
		<![endif]-->
		</td>
  `)
}

function newFriend (friendFName, friendLName, secret) {
	return (`
	<td>
		<!--[if mso]>
		<center>
		<table><tr><td width="600">
		<![endif]-->
		<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
		<tbody><tr>
			<td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
		<tbody><tr>
		<td role="module-content">
		<p></p>
		</td>
		</tr>
		</tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b0dd0656-23ce-4f1f-a7d3-abfa2ee728d1" data-mc-module-version="2019-10-22">
		<tbody>
		<tr>
		<td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Hello ${friendFName} ${friendLName}. You have been invited by a friend to Social Circle! ***Some sort of description about the app***</div><div></div></div></td>
		</tr>
		</tbody>
		</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="fe95eefa-f9d6-4aec-8158-0ae968eca884" data-mc-module-version="2019-10-22">
		<tbody>
		<tr>
		<td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-family: arial, helvetica, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline">Below is your personalized link that will take you to your account. Please use this link to access your account in the future.&nbsp;</span>&nbsp;</div><div></div></div></td>
		</tr>
		</tbody>
		</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="657513d6-aa73-40b7-9f26-2783715fdb4c" data-mc-module-version="2019-10-22">
		<tbody>
		<tr>
		<td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><a href="https://social-circle.herokuapp.com/">Link</a></div><div></div></div></td>
		</tr>
		</tbody>
		</table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-size:12px; line-height:20px;">{{Sender_Name}}</p><p style="font-size:12px; line-height:20px;"><span class="Unsubscribe--senderAddress">{{Sender_Address}}</span>, <span class="Unsubscribe--senderCity">{{Sender_City}}</span>, <span class="Unsubscribe--senderState">{{Sender_State}}</span> <span class="Unsubscribe--senderZip">{{Sender_Zip}}</span></p></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
		</tr>
		</tbody></table>
		<!--[if mso]>
		</td>
		</tr>
		</table>
		</center>
		<![endif]-->
		</td>
    `)
}

module.exports = {
  newUser,
  newFriend
}
