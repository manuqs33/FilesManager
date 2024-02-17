import { toast } from 'react-hot-toast';

const getStyles = (action) => {
  switch (action) {
    case 'success':
      return {
        style: {
          background: '#2f9c95',
          color: '#FFFFFF',
          width: '322px',
          height: '75px',
          fontSize: '20px',
          fontFamily: 'Open Sans',
        },
        iconTheme: {
          primary: '#2f9c95',
          secondary: '#2f9c95',
        },
      };
    case 'error':
      return {
        style: {
          background: '#A13D63',
          color: '#FFFFFF',
          width: '322px',
          height: '75px',
          fontSize: '20px',
          fontFamily: 'Open Sans',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#DC3545',
        },
      };
      case 'warning':
      return {
        style: {
          background: '#FF9F1C',
          color: '#FFFFFF',
          width: '322px',
          height: '75px',
          fontSize: '20px',
          fontFamily: 'Open Sans',
        },
        iconTheme: {
          primary: '#FF9F1C',
          secondary: '#FF9F1C',
        },
      };
  }
};

toast.custom();
export const notifyToast = (message, action = 'success', duration = 5000) => {
  const styles = getStyles(action);
  const options = {
    duration: duration,
    style: styles.style,
    iconTheme: styles.iconTheme,
  };

  toast.remove(); 
  switch (action) {
    case 'success':
      toast.success(message, options);
      break;
    case 'warning':
      toast.error(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
  }
};
