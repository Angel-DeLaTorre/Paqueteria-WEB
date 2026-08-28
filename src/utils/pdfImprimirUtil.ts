export const pdfImprimirUtil = (archivo: Blob): void =>  {

        // Creamos la URL temporal del Blob y lanzamos la impresión
        const blob = new Blob([archivo], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);

        iframe.onload = () => {
            try {
                iframe.contentWindow?.print();
            } catch (error) {
                console.error('Error al invocar la impresión:', error);
            }
        };
}