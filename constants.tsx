
import { ToneOption } from './types';

export const TONE_OPTIONS: ToneOption[] = [
  {
    id: 'formal',
    label: '매우 정중하게 (Formal)',
    icon: '🏛️',
    description: '공적인 자리나 상사, 거래처에 적합한 격식 있는 문체'
  },
  {
    id: 'polite',
    label: '친절하고 부드럽게 (Polite)',
    icon: '🤝',
    description: '협업 시 동료나 파트너에게 신뢰를 주는 따뜻한 문체'
  },
  {
    id: 'direct',
    label: '간결하고 명확하게 (Direct)',
    icon: '🎯',
    description: '핵심만 정확하게 전달하는 효율적인 비즈니스 문체'
  },
  {
    id: 'apologetic',
    label: '정중한 사과 (Apologetic)',
    icon: '🙏',
    description: '실수나 지연에 대해 진심을 담아 양해를 구하는 문체'
  },
  {
    id: 'appreciative',
    label: '감사 표현 (Appreciative)',
    icon: '✨',
    description: '상대방의 도움이나 성과에 대해 감사를 전하는 긍정적인 문체'
  }
];
