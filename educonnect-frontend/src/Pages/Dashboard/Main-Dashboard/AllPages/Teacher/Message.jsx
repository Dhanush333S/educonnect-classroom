import "./CSS/Message.css";

export default function Message({ mine, message , time }) {
  return (
    <div className="message-container">
      <div className={mine ? "message-mine" : "message"}>
        {message}
        <span className="message-time">{time}</span>
      </div>
    </div>
  );
}
