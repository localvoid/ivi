# Security

## XSS

> Cross-site scripting (XSS) is a type of computer security vulnerability typically found in web applications. XSS
> enables attackers to inject client-side scripts into web pages viewed by other users. A cross-site scripting
> vulnerability may be used by attackers to bypass access controls such as the same-origin policy. Cross-site
> scripting carried out on websites accounted for roughly 84% of all security vulnerabilities documented by Symantec
> as of 2007. Their effect may range from a petty nuisance to a significant security risk, depending on the
> sensitivity of the data handled by the vulnerable site and the nature of any security mitigation implemented by
> the site's owner.

[Wikipedia article on Cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting)

Almost all modern web UI libraries doesn't rely on string concatenation to render views, they modify DOM structure with
DOM APIs. DOM modification with DOM API significantly reduces number of possible XSS attack vectors, but it doesn't give
you complete protection from XSS.

It is important that you understand many different XSS attack vectors when building an application:

- [XSS Filter Evasion Cheat Sheet](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet)
- [HTML5 Security Cheatsheet](http://heideri.ch/jso/)
