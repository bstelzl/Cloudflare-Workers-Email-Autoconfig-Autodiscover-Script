addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

//async function because of await (promise)
async function handleRequest(request) {
  if (new URL(request.url).hostname.includes("autodiscover") === true) {
    var email = await request.text()
    var pos = email.search("EMailAddress")+13
    email = email.substr(pos, email.search("/EMailAddress")-1-pos)
    var autodiscover=`<?xml version="1.0" encoding="utf-8" ?>
        <Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
        <Response xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a">
            <Account>
                <AccountType>email</AccountType>
                <Action>settings</Action>
                <Protocol>
                    <Type>IMAP</Type>
                    <Server>imap.example.com</Server>
                    <Port>993</Port>
                    <DomainRequired>off</DomainRequired>
                    <LoginName>`+email+`</LoginName>
                    <SPA>off</SPA>\
                    <SSL>on</SSL>
                    <AuthRequired>on</AuthRequired>
                </Protocol>
                <Protocol>
                    <Type>SMTP</Type>
                    <Server>smtp.example.com</Server>
                    <Port>465</Port>
                    <DomainRequired>off</DomainRequired>
                    <LoginName>`+email+`</LoginName>
                    <SPA>off</SPA>
                    <SSL>on</SSL>
                    <AuthRequired>on</AuthRequired>
                    <UsePOPAuth>on</UsePOPAuth>
                    <SMTPLast>off</SMTPLast>
                </Protocol>
            </Account>
        </Response>
        </Autodiscover>`
    return new Response(autodiscover, {status: 200, headers: {"Content-Type":"application/xml"}})
  } else {
    var email = new URL(request.url).searchParams.get("emailaddress")
    var autoconfig=`<?xml version="1.0" encoding="utf-8" ?>
        <clientConfig version="1.1">
        <emailProvider id="example.com">
            <domain>example.com</domain>
            <displayName>`+email+`</displayName>
            <displayShortName>example.com</displayShortName>
            <incomingServer type="imap">
            <hostname>imap.example.com</hostname>
            <port>993</port>
            <socketType>SSL</socketType>
            <authentication>password-cleartext</authentication>
            <username>`+email+`</username>
            </incomingServer>
            <outgoingServer type="smtp">
            <hostname>smtp.example.com</hostname>
            <port>465</port>
            <socketType>SSL</socketType>
            <authentication>password-cleartext</authentication>
            <username>`+email+`</username>
            </outgoingServer>
        </emailProvider>
        </clientConfig>`
    return new Response(autoconfig, {status: 200, headers: {"Content-Type":"application/xml"}})
  }
}
