import { MAX_SKILL_POINTS } from "../consts";
import { getModifierCount } from "../utils";
import Card from "./lib/Card";

const Skills = ({ maxSkillPoints, skills, attrs, onIncrease, onDecrease }) => {
  return (
    <Card title="Skills">
      <h3>Total skill points available: {maxSkillPoints}</h3>
      {skills.map((skillItem) => (
        <div key={skillItem.name}>
            {skillItem.name} - points: {skillItem.value}
            (Modifier: {skillItem.attributeModifier}: {getModifierCount(attrs[skillItem.attributeModifier])})
            total: {skillItem.value + getModifierCount(attrs[skillItem.attributeModifier])}
          <button onClick={() => onIncrease(skillItem.name, 1)}>+</button>
          <button onClick={() => onDecrease(skillItem.name, 1)}>-</button>
        </div>
      ))}
    </Card>
  );
};

export default Skills;