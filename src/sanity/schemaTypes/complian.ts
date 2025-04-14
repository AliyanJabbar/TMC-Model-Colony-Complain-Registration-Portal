export const complaint = {
  name: "complain",
  title: "Complain",
  type: "document",
  fields: [
    {
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Against dogs", value: "against-dogs" },
          { title: "Garbage Collection", value: "garbage" },
          { title: "Street Lights", value: "street-lights" },
          { title: "Anti Encroachment", value: "anti-encroachment" },
          { title: "Dangue Spray", value: "dangue-spray" },
          { title: "Parks", value: "parks" },
          { title: "Rain Water", value: "rain-water" },
          { title: "Sewerage", value: "sewerage" },
          { title: "Road Cutting", value: "road-cutting" },
          { title: "Road Repair", value: "repair-road" },
          { title: "Street Light", value: "street-light" },
          { title: "Sweeping", value: "sweeping" },
          { title: "Water", value: "water" },
        ],
      },
    },
    {
      name: "customerDetails",
      title: "Customer Details",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
        },
        {
          name: "phone",
          title: "Phone",
          type: "string",
        },
        {
          name: "address",
          title: "Address",
          type: "text",
        },
      ],
    },
    {
      name: "message",
      title: "Complaint Message",
      type: "text",
    },
    {
      name: "reply",
      title: "Reply",
      type: "string",
    },
    {
      name: "complainDate",
      title: "Complaint Date",
      type: "datetime",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "In Progress", value: "in-progress" },
          { title: "Resolved", value: "resolved" },
        ],
      },
      initialValue: "pending",
    },
  ],
};
