import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode, Share2, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface QRCodeModalProps {
  trigger: React.ReactNode;
}

export default function QRCodeModal({ trigger }: QRCodeModalProps) {
  const [open, setOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const { toast } = useToast();

  // Получаем URL приложения
  const appUrl = window.location.origin;

  useEffect(() => {
    if (open) {
      generateQRCode();
    }
  }, [open]);

  const generateQRCode = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(appUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1f2937', // Темно-серый цвет
          light: '#ffffff', // Белый фон
        },
        errorCorrectionLevel: 'M',
      });
      setQrCodeDataUrl(qrDataUrl);
    } catch (error) {
      console.error('Ошибка генерации QR-кода:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать QR-код",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = 'cat-generator-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Успешно!",
      description: "QR-код сохранен в загрузки",
    });
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      toast({
        title: "Скопировано!",
        description: "Ссылка скопирована в буфер обмена",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive",
      });
    }
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Генератор Котиков',
          text: 'Создавай уникальные изображения котиков!',
          url: appUrl,
        });
      } catch (error) {
        // Пользователь отменил шаринг
      }
    } else {
      // Fallback - копируем в буфер обмена
      copyUrl();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-sm mx-auto md:max-w-md lg:max-w-lg scale-in animate-backdrop">
        <DialogHeader className="fade-in-up">
          <DialogTitle className="flex items-center space-x-2 text-center justify-center">
            <QrCode className="w-5 h-5 text-ios-blue bounce-in animate-delay-100" />
            <span className="slide-in-left animate-delay-150">QR-код Приложения</span>
          </DialogTitle>
          <DialogDescription className="text-center slide-in-right animate-delay-200">
            Поделитесь приложением или откройте на другом устройстве
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 md:space-y-8">
          {/* QR Code Display */}
          <Card className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover-lift transition-spring">
            <div className="text-center space-y-4 stagger-children">
              {qrCodeDataUrl ? (
                <div className="flex justify-center">
                  <img
                    src={qrCodeDataUrl}
                    alt="QR-код приложения"
                    data-testid="img-qr-code"
                    className="w-64 h-64 md:w-80 md:h-80 rounded-xl shadow-md fade-in-blur"
                  />
                </div>
              ) : (
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-100 rounded-xl mx-auto flex items-center justify-center shimmer-blue">
                  <QrCode className="w-12 h-12 text-gray-400 animate-spin-slow" />
                </div>
              )}
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Сканируйте для доступа</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Наведите камеру телефона на QR-код для быстрого доступа к приложению
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 stagger-children">
            <Button
              onClick={shareApp}
              data-testid="button-share-app"
              className="w-full bg-ios-blue hover:bg-ios-blue/90 text-white rounded-xl ios-button-scale transition-spring ripple-effect glow-effect"
            >
              <Share2 className="w-4 h-4 mr-2 transition-spring group-hover:rotate-12" />
              Поделиться Приложением
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={downloadQRCode}
                variant="outline"
                data-testid="button-download-qr"
                className="rounded-xl ios-button-scale transition-spring ripple-effect hover-lift"
                disabled={!qrCodeDataUrl}
              >
                <Download className="w-4 h-4 mr-2 transition-spring group-hover:translate-y-1" />
                Скачать
              </Button>

              <Button
                onClick={copyUrl}
                variant="outline"
                data-testid="button-copy-url"
                className="rounded-xl ios-button-scale transition-spring ripple-effect hover-lift"
              >
                <Copy className="w-4 h-4 mr-2 transition-spring group-hover:scale-110" />
                Копировать
              </Button>
            </div>
          </div>

          {/* App URL Display */}
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl hover-lift transition-spring fade-in-up animate-delay-400">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Ссылка на приложение:</p>
              <p className="text-sm font-mono text-gray-700 break-all bg-white px-3 py-2 rounded-lg transition-spring hover:bg-gray-50" data-testid="text-app-url">
                {appUrl}
              </p>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}