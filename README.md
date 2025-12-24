# Zinny Derecho Inmobiliario - Website

## Configuración de EmailJS

Para que el formulario de contacto funcione correctamente, necesitas configurar EmailJS:

### Paso 1: Crear una cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate con tu cuenta de Google o email
3. Confirma tu email

### Paso 2: Configurar el servicio de email
1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona Gmail (o el servicio que prefieras)
4. Conecta tu cuenta de Gmail: **Zinnyderechoinmobiliario@gmail.com**
5. Copia el **Service ID** que se genera

### Paso 3: Crear una plantilla de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla:

```
Asunto: Nuevo mensaje de contacto - {{from_name}}

De: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}

Mensaje:
{{message}}
```

4. En la configuración de la plantilla:
   - **To Email**: {{to_email}}
   - **From Name**: {{from_name}}
   - **Reply To**: {{from_email}}
5. Guarda y copia el **Template ID**

### Paso 4: Obtener tu Public Key
1. Ve a "Account" en el menú
2. En la sección "General", encontrarás tu **Public Key**
3. Cópiala

### Paso 5: Actualizar el código
Abre el archivo `assets/js/contact.js` y reemplaza:

```javascript
// Línea 6
emailjs.init('YOUR_PUBLIC_KEY'); // Reemplaza con tu Public Key

// Línea 25
emailjs.send('service_rs5thie', 'template_vkuiqf8', formData)
// Reemplaza YOUR_SERVICE_ID y YOUR_TEMPLATE_ID con los valores copiados
```

### Ejemplo de configuración:
```javascript
// Ejemplo (usa tus propios valores)
emailjs.init('user_abc123xyz456');

emailjs.send('service_gmail123', 'template_contact456', formData)
```

## Estructura de Archivos

```
Zinny/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js          # Navegación y efectos de scroll
│   │   └── contact.js       # Formulario de contacto con EmailJS
│   └── images/
│       └── property_caballito_1766160707620.png
└── README.md
```

## Características Implementadas

### ✅ Barra de navegación sticky
- La barra se mueve con el scroll
- Se oculta al hacer scroll hacia abajo
- Aparece al hacer scroll hacia arriba

### ✅ Botón de volver arriba
- Aparece automáticamente después de hacer scroll 300px
- Animación suave al hacer clic
- Diseño circular con el color principal

### ✅ Organización de archivos
- Carpeta `assets` creada
- CSS, JavaScript e imágenes organizados en subcarpetas
- Código JavaScript separado en archivos modulares

### ✅ Formulario de contacto con EmailJS
- Envío directo de emails sin backend
- Notificaciones de éxito/error
- Validación de campos
- Reseteo automático del formulario

## Cómo probar el sitio

1. Abre `index.html` en tu navegador
2. Haz scroll para ver la barra de navegación y el botón de volver arriba
3. Completa el formulario de contacto (después de configurar EmailJS)

## Notas importantes

- El formulario de contacto **NO funcionará** hasta que configures EmailJS con tus credenciales
- EmailJS tiene un límite gratuito de 200 emails por mes
- Asegúrate de mantener tu Public Key segura (aunque es pública, evita compartirla innecesariamente)
