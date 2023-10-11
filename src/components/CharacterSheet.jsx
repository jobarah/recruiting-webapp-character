import { useEffect, useMemo, useState } from "react";
import Attributes from "./Attributes";

import './CharacterSheet.css';
import Classes from "./Classes";
import Requirements from "./Requirements";
import { MAX_ATTRIBUTE_VALUE, MAX_SKILL_POINTS } from "../consts";
import Skills from "./Skills";
import { getModifierCount } from "../utils";

const CharacterSheet = ({ attributeList, classList, skillList }) => {
  const classes = useMemo(() => Object.keys(classList), [classList]);
  const classSet = useMemo(() => classList, [classList]);

  const [attributes, setAttributes] = useState({});
  const [skills, setSkills] = useState([]);

  const [eligibleClasses, setEligibleClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  const [attributeCount, setAttributeCount] = useState(0);
  const [skillPoints, setSkillPoints] = useState(0);

  const maxskillPoints = useMemo(() => {
    const intelligencePoints = attributes.Intelligence;

    if (intelligencePoints > 10) {
      return MAX_SKILL_POINTS + getModifierCount(intelligencePoints);
    }

    return MAX_SKILL_POINTS;
  }, [attributes.Intelligence]);

  console.log('maxskillPoints', maxskillPoints);

  useEffect(() => {
    const transformedAttributes = attributeList.reduce((acc, attribute) => ({...acc, [attribute]: 0 }), {});
    setAttributes(transformedAttributes);
  }, [attributeList]);

  useEffect(() => {
    const transformedSkills = skillList.map((skill) => ({ ...skill, value: 0 }));
    setSkills(transformedSkills);
  }, [skillList]);

  useEffect(() => {

    const newEligibleClasses = Object.keys(classSet)
      .reduce((acc, classItem) => {

        const isElegible = Object.keys(attributes).every((attribute) => attributes[attribute] >= classSet[classItem][attribute]);

        if (isElegible) {
          return [...acc, classItem];
        }

        return acc;

      }, []);
    
    setEligibleClasses(newEligibleClasses)
  }, [attributes, classSet]);

  const onAttributeIncrease = (id, value) => {
    if (attributeCount + value > MAX_ATTRIBUTE_VALUE) {
      alert('You have reached the maximum attribute value!');
      return;
    }
  
    const newAttrs = {...attributes, [id]: attributes[id] + value };
    setAttributeCount(attributeCount + value);
    setAttributes(newAttrs);
  };

  const onAttributeDecrease = (id, value) => {
    if (attributes[id] - value < 0) {
      alert('You cannot have negative attribute values!');
      return;
    }

    const newAttrs = {...attributes, [id]: attributes[id] - value };
    setAttributeCount(attributeCount - value);
    setAttributes(newAttrs);
  }

  const onSkillIncrease = (id, value) => {
    if (skillPoints + value > MAX_SKILL_POINTS) {
      alert('You have reached the maximum skill points!');
      return;
    }

    const newSkills = skills.map((skill) => {
      if (skill.name === id) {
        return { ...skill, value: skill.value + value };
      }

      return skill;
    });

    setSkillPoints(skillPoints + value);
    setSkills(newSkills);
  };

  const onSkillDecrease = (id, value) => {
    if (skillPoints - value < 0) {
      alert('You have reached the minimum skill points!');
      return;
    }

    const newSkills = skills.map((skill) => {
      if (skill.name === id) {
        return { ...skill, value: skill.value - value };
      }

      return skill;
    });

    setSkillPoints(skillPoints - value);
    setSkills(newSkills);
  };

  return (
    <>
      <Attributes
        attributeList={attributes}
        onIncrease={onAttributeIncrease}
        onDecrease={onAttributeDecrease}
      />
      <Classes
        classList={classes}
        onClick={(classItem) => setSelectedClass(classItem)}
        eligibleClasses={eligibleClasses}
      />
      {selectedClass && (
        <Requirements
          selectedClass={selectedClass}
          classSet={classSet}
          onClick={() => setSelectedClass('')}
        />
      )
      }
      <Skills
        maxSkillPoints={maxskillPoints}
        skills={skills}
        attrs={attributes}
        onIncrease={onSkillIncrease}
        onDecrease={onSkillDecrease}
      />
    </>
  );
}

export default CharacterSheet;