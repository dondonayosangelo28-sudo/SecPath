export const cloudLessons = [
  {
    title: "What is a deployment model?",
    overview: "A cloud deployment model describes who can use the cloud infrastructure, who controls it, and how it is shared. The four models are public, private, hybrid, and community cloud.",
    image: {
      file: "cloud-models.webp",
      alt: "A central cloud connects to four infrastructure arrangements.",
      caption: "Compare the models by who shares infrastructure and where workloads run."
    },
    details: [
      ["Access and ownership", "Identify who can use the environment and who operates it. A provider can operate either a public cloud or a dedicated private cloud."],
      ["Workload and data placement", "Decide where the application, its data, and its backups need to reside. Consider how you will control access from each location."],
      ["Deployment and service models", "Deployment models describe who can use the infrastructure. Service models such as IaaS, PaaS, and SaaS describe what the provider delivers and what the customer manages."]
    ],
    example: "A student project can publish course materials on a public hosting service while keeping unpublished grades in a separate, access-controlled system."
  },
  {
    title: "Public and private cloud",
    overview: "A public cloud is available for use by the general public and operated by a provider. A private cloud is reserved for a single organization, including its different departments.",
    details: [
      ["Public cloud", "Multiple tenants can use the provider’s infrastructure while remaining logically isolated. On-demand capacity reduces upfront hardware costs. Customers still configure access to their data and applications."],
      ["Private cloud", "One organization has exclusive use of the cloud environment. It may operate the infrastructure itself or hire a provider. Dedicated capacity and custom controls can raise operating costs."],
      ["Compare the trade-offs", "Estimate demand, identify required isolation, and determine who will handle maintenance, backups, and recovery."]
    ],
    example: "A club can use public cloud hosting for its event site. A hospital could use a private cloud for a workload that requires dedicated infrastructure."
  },
  {
    title: "Hybrid cloud",
    overview: "A hybrid cloud combines two or more distinct cloud environments and connects them so data or applications can move between them. A common combination uses public and private clouds.",
    details: [
      ["Place workloads deliberately", "Keep data that requires dedicated controls in a private cloud and use public capacity for workloads with variable demand."],
      ["Cloud bursting", "When the private environment reaches a planned capacity threshold, eligible workloads can temporarily use public cloud resources."],
      ["Plan for dependencies", "Account for network latency, identity, encryption in transit, and the behavior of each application when the connection is unavailable."]
    ],
    example: "A store keeps its order records in a private cloud and uses a connected public cloud to provide extra storefront capacity during a sale."
  },
  {
    title: "Community cloud",
    overview: "A community cloud is reserved for organizations that share a mission, policy, security requirement, or other concern. The members or a provider can operate it.",
    details: [
      ["Shared infrastructure", "Members can divide operating costs and use a common set of technical controls."],
      ["Joint governance", "Define who can join, who approves changes, who reviews access, and who coordinates incident response."],
      ["Plan for member changes", "Agree on how to grant new members access and how to remove access and handle data when a member leaves."]
    ],
    example: "Several universities could share a research environment with a common sign-in policy and an agreed review process for access to data."
  },
  {
    title: "Multi-cloud and shared responsibility",
    overview: "A multi-cloud strategy uses services from more than one cloud provider. A hybrid strategy connects distinct cloud environments. A project can use both approaches.",
    details: [
      ["Multi-cloud trade-offs", "Different providers may serve different workloads well. Each provider can add its own billing, monitoring, identity, and backup workflows."],
      ["Provider responsibilities", "The provider manages its underlying facilities and equipment. Its responsibilities for the operating system, runtime, and application vary by the service."],
      ["Customer responsibilities", "The customer decides what data to publish and who can access it. Read each service’s responsibilities before assigning work such as access reviews, recovery, and patching."]
    ],
    example: "A team uses one provider to host a public site and another for analytics. It tracks permissions and retention settings in both services."
  },
  {
    title: "Static sites in the public cloud",
    overview: "A static host delivers files such as HTML, CSS, JavaScript, and images. The browser loads those files to render the page and run client-side interactions.",
    image: {
      file: "cloud-publish.webp",
      alt: "Web files pass from a local folder through cloud hosting to a browser.",
      caption: "Prepare the files locally, publish them to a host, then test the hosted page."
    },
    details: [
      ["Prepare the files", "Start with index.html and check that paths to images, styles, and scripts work together. Review the files for private data before publishing."],
      ["Follow the lab workflow", "The exercise manual covers uploading a folder with Netlify and publishing a repository branch with GitHub Pages."],
      ["Verify the published site", "Open the hosted URL, test the page controls, and check that files load on a second screen size. Save the URL and evidence for your exercise."]
    ],
    example: "If an image works locally but is missing on the hosted site, check whether its path and filename capitalization match the uploaded file."
  }
];

export const iasLessons = [
  {
    title: "Firewalls, IDS, and IPS",
    overview: "A firewall enforces access policy. An intrusion detection system (IDS) observes activity and raises alerts. An intrusion prevention system (IPS) can block matching traffic when configured and deployed inline.",
    image: {
      file: "snort-monitoring.webp",
      alt: "A network sensor observes packet traffic and reports a match to a dashboard.",
      caption: "A passive network IDS observes a copy of traffic and sends alerts for analysis."
    },
    details: [
      ["Firewall", "A firewall may allow or deny connections according to criteria such as network addresses, ports, and the organization’s policies."],
      ["IDS", "A passive IDS observes traffic that reaches its monitoring point and produces alerts for inspection. The original traffic can continue along its path."],
      ["IPS", "Traffic passes through an inline IPS, where configured rules can take prevention actions. Test the rules before using them to block production traffic."]
    ],
    example: "A lab firewall permits routine diagnostics. Snort records a matching ICMP echo request so you can confirm that the IDS sees traffic on the monitored interface."
  },
  {
    title: "Snort operation modes",
    overview: "The course groups Snort’s common uses into displaying packets, recording packets, and detecting traffic that matches a rule.",
    details: [
      ["Sniffer", "Displaying headers or packet details can help you check whether traffic reaches the monitored interface."],
      ["Packet logging", "Recording packets lets an analyst investigate them later. Captures can contain sensitive data, so keep them only as long as needed and restrict access."],
      ["Intrusion detection", "With detection rules enabled, Snort can inspect traffic and report matching events. Output settings determine where you see the alerts."]
    ],
    example: "Use the packet view to confirm that lab traffic arrives, then use the alert output to verify that the expected rule matched."
  },
  {
    title: "How packets become alerts",
    overview: "Snort takes in traffic, interprets it, evaluates it against rules, and records events. Understanding the stages helps you determine why a rule did or did not match.",
    details: [
      ["Acquire and inspect", "The packet acquisition layer reads traffic from an interface or a saved capture. Protocol inspectors interpret packet fields and relevant session context."],
      ["Evaluate the rules", "The rule header selects the applicable traffic. The options can add more conditions, such as the ICMP message type used in the exercise manual."],
      ["Record the event", "If a matching rule uses the alert action, the configured output can record a message, rule identifier, and traffic details."]
    ],
    example: "If your expected alert is missing, confirm the sensor captured the packet, the rule was loaded, and the result is being sent to the output you are checking."
  },
  {
    title: "Anatomy of a Snort rule",
    overview: "A Snort rule contains a header and options. The header identifies the action and traffic to consider. Options can specify extra conditions or describe the event.",
    details: [
      ["Header", "Read the action, protocol, source, direction, and destination. Source and destination fields can also include ports for the relevant protocols."],
      ["Match options", "The exercise manual’s rule uses itype:8 to select an ICMP echo request. An ICMP echo reply has a different type and falls outside that rule."],
      ["Alert metadata", "The msg option supplies the alert label, sid identifies the rule, and rev records its revision."]
    ],
    example: "Compare an echo request and echo reply against the exercise manual’s rule. Both use ICMP, but only the echo request meets the rule’s type condition."
  },
  {
    title: "Reading alerts",
    overview: "An alert tells you that traffic met a rule’s conditions. Use the event details and what you know about the network to decide whether it needs investigation.",
    image: {
      file: "snort-alert.webp",
      alt: "An analyst dashboard shows an event timeline and connected devices under review.",
      caption: "Read the alert in context by checking its time, endpoints, and related activity."
    },
    details: [
      ["Read the fields", "Check the time, message, rule ID, protocol, and source and destination addresses. Read any ports in the context of the protocol."],
      ["Correlate with context", "Check whether the source is an expected monitoring device or whether the event lines up with scheduled work or nearby alerts."],
      ["Distinguish detection outcomes", "A false positive flags legitimate activity as suspicious. A false negative occurs when activity that should be detected goes unreported."]
    ],
    example: "An echo-request alert from the lab workstation can be expected when you run a connectivity check. Compare the event time and source address with your test notes."
  },
  {
    title: "Testing and tuning",
    overview: "Test detection rules against known traffic in a controlled environment. A useful test checks a sample that should match and a similar one that should fall outside the rule.",
    details: [
      ["Define the expected result", "Write down which packet should generate an alert, which should be skipped, and which rule ID you expect to see."],
      ["Check both samples", "Compare your expected results to the recorded output. Review any unexpected match or missed alert before changing the rule."],
      ["Retest after changes", "Record the rule revision and why it changed. Repeat the original tests so you can catch a regression."]
    ],
    example: "For the exercise manual’s rule, predict how an echo request, an echo reply, and a UDP DNS request would be classified. Explain each prediction using the rule’s protocol and type."
  }
];
