export interface PixCodeData {
  key: string;
  merchantName: string;
  merchantCity: string;
  amount: number;
  description?: string;
  format: 'static' | 'dynamic';
}

function decodePixValue(pixCode: string, gui: string): PixCodeData | null {
  const format = gui.substring(0, 2);
  const guiId = gui.substring(2);
  
  if (guiId !== 'BR.GOV.BCB.PIX') {
    return null;
  }

  const result: PixCodeData = {
    key: '',
    merchantName: '',
    merchantCity: '',
    amount: 0,
    format: format === '01' ? 'static' : 'dynamic',
  };

  let remaining = pixCode.substring(gui.length + 4);

  while (remaining.length > 4) {
    const id = remaining.substring(0, 2);
    const length = parseInt(remaining.substring(2, 4), 10);
    const value = remaining.substring(4, 4 + length);
    
    switch (id) {
      case '01':
        result.key = value;
        break;
      case '05':
        break;
      case '07':
        result.amount = parseFloat(value);
        break;
      case '09':
        result.merchantName = value;
        break;
      case '10':
        result.merchantCity = value;
        break;
      case '62':
        break;
    }

    remaining = remaining.substring(4 + length);
  }

  return result;
}

export function parsePixCopyPaste(pixCode: string): PixCodeData | null {
  try {
    const cleanCode = pixCode.trim();
    
    if (!cleanCode.startsWith('000201')) {
      return null;
    }

    let pos = 0;
    let gui = '';
    
    while (pos < cleanCode.length) {
      const id = cleanCode.substring(pos, pos + 2);
      const length = parseInt(cleanCode.substring(pos + 2, pos + 4), 10);
      
      if (id === '00') {
        gui = cleanCode.substring(pos + 4, pos + 4 + length);
      }
      
      pos += 4 + length;
      
      if (id === '00') break;
    }

    if (!gui) return null;

    return decodePixValue(cleanCode, gui);
  } catch (error) {
    console.error('Erro ao parsear código PIX:', error);
    return null;
  }
}

export function formatPixAmount(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}
