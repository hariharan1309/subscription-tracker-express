import nodemailer from "nodemailer";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Helper function to send emails
const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending failed: ", error);
    throw error;
  }
};

// Email template for subscription creation
export const sendSubscriptionCreationEmail = async (user, subscription) => {
  const { email, name } = user;
  const {
    name: subName,
    price,
    frequency,
    category,
    paymentMethod,
    startDate,
    renewalDate,
  } = subscription;

  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedRenewalDate = new Date(renewalDate).toLocaleDateString();
  const capitalizedFrequency =
    frequency.charAt(0).toUpperCase() + frequency.slice(1);

  const mailOptions = {
    from: `"Subscription Manager" <${process.env.EMAIL_FROM}>`,
    to: email,
    cc: "hariharana1309@gmail.com",
    subject: `Your ${subName} Subscription Has Been Created`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #4a86e8;">Subscription Created Successfully</h2>
        <p>Hello ${name},</p>
        <p>Your subscription to <strong>${subName}</strong> has been created successfully!</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="margin-top: 0; color: #333;">Subscription Details:</h3>
          <p><strong>Name:</strong> ${subName}</p>
          <p><strong>Price:</strong> ${price} (${capitalizedFrequency})</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p><strong>Start Date:</strong> ${formattedStartDate}</p>
          <p><strong>Next Renewal:</strong> ${formattedRenewalDate}</p>
        </div>
        
        <p>You can manage your subscriptions anytime from your account dashboard.</p>
        <p>Thank you for using our service!</p>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `,
  };

  return await sendEmail(mailOptions);
};

// Email template for subscription update
export const sendSubscriptionUpdateEmail = async (
  user,
  subscription,
  oldSubscription
) => {
  const { email, name } = user;
  const { name: subName, price, frequency, status, renewalDate } = subscription;

  const formattedRenewalDate = new Date(renewalDate).toLocaleDateString();
  const capitalizedFrequency =
    frequency.charAt(0).toUpperCase() + frequency.slice(1);

  // Check what fields were updated
  const changes = [];
  if (oldSubscription.price !== subscription.price) {
    changes.push(
      `Price changed from $${oldSubscription.price} to $${subscription.price}`
    );
  }
  if (oldSubscription.frequency !== subscription.frequency) {
    const oldCapitalizedFrequency =
      oldSubscription.frequency.charAt(0).toUpperCase() +
      oldSubscription.frequency.slice(1);
    changes.push(
      `Billing frequency changed from ${oldCapitalizedFrequency} to ${capitalizedFrequency}`
    );
  }
  if (oldSubscription.status !== subscription.status) {
    const oldCapitalizedStatus =
      oldSubscription.status.charAt(0).toUpperCase() +
      oldSubscription.status.slice(1);
    const newCapitalizedStatus =
      status.charAt(0).toUpperCase() + status.slice(1);
    changes.push(
      `Status changed from ${oldCapitalizedStatus} to ${newCapitalizedStatus}`
    );
  }
  if (
    oldSubscription?.renewalDate &&
    oldSubscription.renewalDate.toString() !==
      subscription.renewalDate.toString()
  ) {
    const oldFormattedRenewalDate = new Date(
      oldSubscription.renewalDate
    ).toLocaleDateString();
    changes.push(
      `Renewal date changed from ${oldFormattedRenewalDate} to ${formattedRenewalDate}`
    );
  }

  const mailOptions = {
    from: `"Subscription Manager" <${process.env.EMAIL_FROM}>`,
    to: email,
    cc: "hariharana1309@gmail.com",
    subject: `Your ${subName} Subscription Has Been Updated`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #4a86e8;">Subscription Updated</h2>
        <p>Hello ${name},</p>
        <p>Your subscription to <strong>${subName}</strong> has been updated.</p>
        
        ${
          changes.length > 0
            ? `
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="margin-top: 0; color: #333;">Changes Made:</h3>
          <ul style="padding-left: 20px;">
            ${changes.map((change) => `<li>${change}</li>`).join("")}
          </ul>
        </div>
        `
            : ""
        }
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="margin-top: 0; color: #333;">Current Subscription Details:</h3>
          <p><strong>Name:</strong> ${subName}</p>
          <p><strong>Price:</strong> ${price} (${capitalizedFrequency})</p>
          <p><strong>Status:</strong> ${
            status.charAt(0).toUpperCase() + status.slice(1)
          }</p>
          <p><strong>Next Renewal:</strong> ${formattedRenewalDate}</p>
        </div>
        
        <p>You can manage your subscriptions anytime from your account dashboard.</p>
        <p>Thank you for using our service!</p>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `,
  };

  return await sendEmail(mailOptions);
};

// Email template for subscription cancellation/deletion
export const sendSubscriptionCancellationEmail = async (
  user,
  subscription,
  isCancelled = true
) => {
  const { email, name } = user;
  const { name: subName, price, frequency } = subscription;

  const capitalizedFrequency =
    frequency.charAt(0).toUpperCase() + frequency.slice(1);
  const action = isCancelled ? "Cancelled" : "Deleted";

  const mailOptions = {
    from: `"Subscription Manager" <${process.env.EMAIL_FROM}>`,
    to: email,
    cc: "hariharana1309@gmail.com",
    subject: `Your ${subName} Subscription Has Been ${action}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: ${
          isCancelled ? "#f39c12" : "#e74c3c"
        };">Subscription ${action}</h2>
        <p>Hello ${name},</p>
        <p>Your subscription to <strong>${subName}</strong> has been ${
      isCancelled ? "cancelled" : "deleted"
    }.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="margin-top: 0; color: #333;">Subscription Details:</h3>
          <p><strong>Name:</strong> ${subName}</p>
          <p><strong>Price:</strong> ${price} (${capitalizedFrequency})</p>
          ${isCancelled ? "<p><strong>Status:</strong> Cancelled</p>" : ""}
        </div>
        
        ${
          isCancelled
            ? `<p>You will no longer be charged for this subscription, but you can reactivate it anytime from your account dashboard.</p>`
            : `<p>This subscription has been completely removed from your account. If this was a mistake, please create a new subscription.</p>`
        }
        
        <p>Thank you for using our service!</p>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `,
  };

  return await sendEmail(mailOptions);
};
