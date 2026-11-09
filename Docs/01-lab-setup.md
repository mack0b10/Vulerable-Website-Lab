# Lab Setup and Network Configuration

## Configuring Network Access to the Express Server

Initially, my Node.js Express server was configured to listen on `127.0.0.1`, meaning the website could only be accessed from the computer hosting it.

I changed the listening address to `10.0.0.12`, which is my Windows desktop's private Wi-Fi IP address. This allowed the server to accept connections through my local network interface.

I also configured a Windows Firewall rule to permit connections from my Windows laptop at `10.0.0.64` on TCP port `3000`.

This allowed my Kali Linux virtual machine, running through VirtualBox NAT on the laptop, to access the website.

## What I Learned

Binding a server to a network interface determines where it can receive connections, while firewall rules help control which connections are permitted.

I also learned that `127.0.0.1` is a loopback address, whereas `10.0.0.12` is an address assigned to my desktop on the local network.



## VirtualBox NAT Configuration

My Kali Linux virtual machine uses VirtualBox's NAT networking mode.

The VM has its own private IP address (`10.0.2.15`), while the Windows laptop hosting VirtualBox has a different IP address (`10.0.0.64`).

When Kali sends a request to my Express website, VirtualBox translates the outbound connection through the Windows laptop's network interface.

The desktop receives the connection through its local network interface at `10.0.0.12:3000`.

This helped me understand how NAT allows a virtual machine to communicate with devices outside its own virtual subnet.

### Key Takeaway

NAT allows Kali to initiate outbound connections without requiring it to have its own IP address on my home network. The firewall on my desktop controls which incoming connections are permitted.