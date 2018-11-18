export interface JudgmentForm {
  type: string;
  sanction: number;
  description: string;
}

const formType = (type, label) => {
  return {
    type: type,
    label: label
  };
};

export const judgmentTypes = [
  formType('default', 'Default judgement'),
  formType('consent', 'Consent judgement'),
  formType('summary', 'Summary judgement')
];

export const judgmentSanctions = [
  formType(1, 'Bans on business for claimant'),
  formType(2, 'Bans on business for defendant'),
  formType(3, 'Fine for claimant'),
  formType(4, 'Fine for defendant')
];
