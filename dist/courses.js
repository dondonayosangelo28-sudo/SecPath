export const courses = {
  cloud: {
    id: "cloud",
    name: "Cloud Security",
    title: "Cloud Deployment Models",
    description: "Compare cloud environments and see how a simple website goes live on public cloud hosting.",
    icon: "cloud",
    duration: "25 min",
    demoTitle: "Deploy a static website",
    manual: "cloud-deployment-exercise.pdf",
    manualTitle: "Public Cloud Deployment",
    manualDescription: "Follow the Group 7 exercise to deploy a simple website using Netlify and GitHub Pages.",
    deliverables: [
      "Netlify: the live URL and a screenshot of the deployed website.",
      "GitHub Pages: the live URL and screenshots of the website, repository with index.html, and successful Pages deployment."
    ],
    lessons: [
      ["What is a deployment model?", "A cloud deployment model defines who can use the infrastructure, who controls it, and how resources are shared. Compare models by ownership, isolation, operating responsibility, and the location of sensitive workloads."],
      ["Public and private cloud", "A public cloud provider operates infrastructure used by many customers, with logical isolation between tenants. This can reduce upfront cost and make scaling faster. A private cloud is dedicated to one organization and can be operated internally or by a hosting partner. It offers more control over configuration and isolation, with more operating responsibility."],
      ["Hybrid cloud", "A hybrid cloud combines distinct cloud environments with integration between them. A company could keep sensitive data in a private cloud while placing a public-facing app in a public cloud. Cloud bursting uses public cloud capacity for demand spikes while a private environment handles baseline demand. Identity, networking, latency, and data integration all need planning."],
      ["Community cloud", "A community cloud serves organizations with shared needs, such as a group of hospitals with common privacy requirements. Members can share costs and adopt common controls. They also need to agree on governance, access, and incident responsibilities."],
      ["Multi-cloud and shared responsibility", "Multi-cloud means using services from more than one cloud provider. Hybrid cloud focuses on integrating distinct cloud environments, often private and public. With public cloud hosting, the provider manages the underlying infrastructure. Customers still manage their published data, access, and application settings."],
      ["Static sites in the public cloud", "A static host serves files such as index.html, CSS, and JavaScript. The Group 7 lab uses two approaches: upload a site folder to Netlify, or publish a repository branch with GitHub Pages. In both workflows, check the published URL from a browser and verify the page behaves as expected."]
    ],
    questions: [
      ["Which cloud model is provisioned for exclusive use by a single organization?", ["Public cloud", "Private cloud", "Hybrid cloud", "Multi-cloud"], 1, "A private cloud is dedicated to one organization, which may contain multiple teams or business units."],
      ["An enterprise keeps a financial database on its private cloud and runs its customer-facing app on AWS. The two environments are integrated. Which model fits?", ["Community cloud", "Public cloud", "Hybrid cloud", "Private cloud"], 2, "Hybrid cloud connects distinct environments, such as a private cloud and a public cloud."],
      ["Which model shares infrastructure among organizations with common goals or compliance requirements?", ["Community cloud", "Public cloud", "Hybrid cloud", "Multi-cloud"], 0, "A community cloud is reserved for organizations with shared requirements."],
      ["A team uses AWS, Microsoft Azure, and Google Cloud to take advantage of each provider’s strengths. What strategy is this?", ["Private cloud", "Hybrid cloud", "Community cloud", "Multi-cloud"], 3, "Multi-cloud uses services from more than one provider."],
      ["Which model typically lets a startup launch with the least upfront infrastructure spending?", ["Private cloud", "Public cloud", "Community cloud", "Hosted private cloud"], 1, "Public cloud resources can be rented on demand, reducing the need to buy hardware up front."],
      ["Several hospitals share a specialized cloud environment for common healthcare privacy requirements. Which model does this describe?", ["Public cloud", "Private cloud", "Community cloud", "Hybrid cloud"], 2, "A community cloud can serve multiple healthcare organizations with a common set of controls."],
      ["Which challenge commonly comes with integrating a hybrid cloud?", ["On-demand scaling is impossible", "Network complexity, latency, and data integration", "Hardware can never be customized", "Provider outages guarantee zero downtime"], 1, "Connecting environments adds networking and integration work and can introduce latency."],
      ["Which model can dedicate compute, storage, and networking hardware to one organization?", ["Public cloud", "Private cloud", "Multi-cloud", "Community cloud"], 1, "A private cloud can reserve the underlying hardware for one organization."],
      ["What is it called when private infrastructure serves baseline traffic and public cloud capacity handles demand spikes?", ["Cloud bursting", "Cloud sharding", "Edge caching", "Multi-tenancy isolation"], 0, "Cloud bursting temporarily uses public cloud resources when demand exceeds private capacity."],
      ["Who typically manages the underlying infrastructure in a public cloud?", ["The customer’s development team", "The public cloud provider", "Every customer on a rotating basis", "The application’s end users"], 1, "The provider manages the underlying infrastructure. Customers manage their own workloads and data according to the service."]
    ]
  },
  ias: {
    id: "ias",
    name: "IAS 2",
    title: "Intrusion Detection with Snort",
    description: "Learn how Snort inspects network traffic, matches rules, and generates security alerts.",
    icon: "radar",
    duration: "25 min",
    demoTitle: "Inspect traffic with Snort",
    manual: "snort-exercise.pdf",
    manualTitle: "Basic Intrusion Detection Using Snort",
    manualDescription: "Configure and test a basic ICMP detection rule in your lab, then inspect the matching alert.",
    deliverables: [
      "A screenshot showing the Snort alert generated in your lab.",
      "A short explanation of the traffic that triggered the rule and what the alert tells you."
    ],
    lessons: [
      ["Firewalls, IDS, and IPS", "A firewall enforces traffic access policies. An intrusion detection system (IDS) monitors traffic for suspicious patterns and generates alerts. An intrusion prevention system (IPS) can also block matching traffic when deployed inline. Snort can serve as a network IDS or IPS depending on its configuration."],
      ["Snort operation modes", "Sniffer mode displays traffic, packet-logging mode records traffic for later review, and IDS mode evaluates traffic against detection rules. A matching rule can generate an alert. Use inline prevention only when the configuration and network deployment support it."],
      ["How packets become alerts", "Packet acquisition captures traffic from an interface or reads a stored capture. Inspectors decode protocols and interpret traffic. The detection engine evaluates the resulting traffic against rules. The output component records matching events and alerts for review."],
      ["Anatomy of a Snort rule", "The header specifies the action, protocol, source, destination, and direction. The options include details such as msg for the alert label, sid for the rule’s ID, and rev for its revision. A rule with the alert action reports matching traffic. It leaves the packet alone in the detection demo."],
      ["Reading alerts", "Check the rule ID and message, timestamp, protocol, source, and destination. A rule match identifies traffic that met the rule’s conditions. Routine monitoring can also produce matches. An alert triggered by legitimate activity is a false positive when it is classified as suspicious."],
      ["Testing and tuning", "Start with known benign lab traffic and confirm the intended rule matches. Compare the result to a packet outside the rule’s scope, then adjust and retest the rule when its false positives or missed detections justify a change. Keep clear notes on rule revisions."]
    ],
    questions: [
      ["What is the primary purpose of an intrusion detection system (IDS)?", ["To create user accounts", "To monitor activity and detect potential threats", "To speed up internet connections", "To encrypt all network traffic"], 1, "An IDS monitors activity and raises alerts when traffic or behavior matches detection criteria."],
      ["How does an IDS differ from an intrusion prevention system (IPS)?", ["An IDS detects and alerts, while an IPS can also block traffic.", "An IDS blocks all traffic, while an IPS only records it.", "An IDS encrypts traffic, while an IPS decrypts it.", "They serve the same function in all deployments."], 0, "An inline IPS can take action to block matching traffic. An IDS monitors and reports it."],
      ["Which Snort component captures network packets for inspection?", ["Packet acquisition", "Alert message", "Rule identifier", "Web browser"], 0, "Packet acquisition supplies traffic to Snort for protocol inspection and detection."],
      ["What does Snort’s detection engine do?", ["Compares inspected traffic against rules", "Assigns IP addresses to devices", "Creates network cables", "Deletes all captured packets"], 0, "The detection engine evaluates traffic against the configured rules."],
      ["What are the two main parts of a Snort rule?", ["Username and password", "Header and options", "Alert and email", "Browser and server"], 1, "The header gives the match context and action. The options describe more conditions and event metadata."],
      ["In a Snort rule, what does the alert action do?", ["Generates an alert when traffic matches the rule", "Blocks every packet on the network", "Shuts down the computer", "Changes the source IP address"], 0, "The alert action reports the matching event for review."],
      ["What is the purpose of the msg option?", ["To specify the destination port", "To provide a description for the alert", "To assign a rule ID", "To select the network protocol"], 1, "The msg option supplies the human-readable alert text."],
      ["What can an administrator examine in captured network packets?", ["Source and destination addresses", "The physical location of every user", "The passwords of all network users", "The age of the computer"], 0, "Packet headers record addressing information that helps trace the observed traffic."],
      ["What is a false positive in alert analysis?", ["An alert triggered by legitimate activity", "Malicious activity that goes undetected", "A packet with no destination", "A rule that has been deleted"], 0, "A false positive occurs when legitimate activity is flagged as suspicious."],
      ["Why should Snort rules be tested and updated?", ["To reduce false alerts and improve detection", "To make all network traffic malicious", "To replace all other security tools", "To prevent computers from connecting"], 0, "Testing shows whether rules match expected traffic, and updates help keep detection useful."]
    ]
  }
};
