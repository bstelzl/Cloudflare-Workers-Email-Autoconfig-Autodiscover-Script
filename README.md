# Cloudflare Workers Email Autoconfig/Autodiscover Script

Cloudflare Workers Email Autoconfig/Autodiscover Script for Thunderbird/Outlook.

## Getting Started

Please configure your mail server settings in the mailconfig.js file. Just replace example.com with your domain and maybe adjust the ports to your needs.

You can deploy mailconfig.js as a Cloudflare Worker under the domains autoconfig.example.com (for Thunderbird) and autodiscover.example.com (for Outlook).

The script will automatically detect the subdomain it is executed on and respond with the correct XML.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
