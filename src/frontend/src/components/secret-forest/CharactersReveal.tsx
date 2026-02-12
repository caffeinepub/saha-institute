import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const demonSlayerCharacters = [
  'Tanjiro Kamado',
  'Nezuko Kamado',
  'Zenitsu Agatsuma',
  'Inosuke Hashibira',
  'Giyu Tomioka',
  'Shinobu Kocho',
  'Kyojuro Rengoku',
  'Tengen Uzui',
  'Mitsuri Kanroji',
  'Muichiro Tokito',
  'Gyomei Himejima',
  'Sanemi Shinazugawa',
  'Obanai Iguro',
  'Kanao Tsuyuri',
  'Genya Shinazugawa',
  'Muzan Kibutsuji',
  'Akaza',
  'Doma',
  'Kokushibo',
  'Gyutaro',
  'Daki',
  'Enmu',
  'Rui',
  'Kaigaku',
];

export default function CharactersReveal() {
  return (
    <Card className="border-2 border-destructive/30 bg-background/90 backdrop-blur-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="neon-text text-3xl">
          All Demon Slayer Characters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {demonSlayerCharacters.map((character, idx) => (
            <Card key={idx} className="border border-destructive/20 bg-card/50">
              <CardContent className="p-4 text-center">
                <div className="mb-2 text-2xl">⚔️</div>
                <p className="neon-text-subtle text-sm font-semibold">{character}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
