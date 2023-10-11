import Card from "./lib/Card";
import './Attributes.css';
import { getModifierCount } from "../utils";

const Attributes = ({ attributeList, onIncrease, onDecrease }) => {

  return (
    <Card title="Attributes">
      <div className="attribute-content">
        {
          Object.keys(attributeList).map((attribute, index) => (
            <div key={`${attribute}-${index}`} className="attribute">
              <div>{attribute}-{attributeList[attribute]} (Modifier: {getModifierCount(attributeList[attribute])})</div>
              <button onClick={() => onIncrease(attribute, 1)}>+</button>
              <button onClick={() => onDecrease(attribute, 1)}>-</button>
            </div>
          ))
        }
      </div>
    </Card>
  );
};

export default Attributes;