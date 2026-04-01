import { Button } from '../components/ui';

const IMAGES = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH4OPYc_orbndkRgM2vyUciIXfl8NVWeCltvgSEFdkl2fYbuV9Kd8R_CemUuHgtENWWfcBBHqWkYU5EicyzTldPmthBThRug2m6uMS_0RTmTVWOJZagtOTBAmAqdzrNlqapA4stbf1m5VeGfDXDnex_5alQ4y59ihf4F_4XyamIBw7WrY6e69--yK0NEI2LY8nI-WRWWn_qqo51eSKyjcLJwlo4iF5TScMHkmU2oYrDmCVhrq4aOy2ALFDcSHa0FXvZJ4UnP9oI8Ct',
  stack: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQn2T82PP8t89f4ZFGUmwdTBDIgVqRPe9pGrjP4oAGbJ8WSb8TnZZJtE_jpRRrmypkgKRtMnucLevgWS97zbFyBSCp7n13jPA59n1SpgxAGXOPmMgSXuNoCrBS08eqaPcd-gB64LRmvL5Iz85yeBFGEU7qQ_VWAK2MEv7zPP3W4dlFSz_XRm3hXdP7BqwRX2tOC36hfAzirRAq9SXRd_BRCPs8GScVfKlbW0jYRq8mnZx9WndPSq826loXPDOs2TeSF1SK4xRy6AzS',
  detail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8z2ccSTmz9ruIjgsh3H8I5gPw1wgCw-RbgVwnQwcugOFveMMEZGljbNFU_leScLPTPTXKS0wTEXyhFqy3eFGr3FdmEk9kOdt2Ow_DgAeYTT7Lqoz5K2nhCVmy-XCg4As63reHhADCLUvFYBRDTh2XsfuFoqPqq6oZo7qxPF-nSLBWa3-048RCjIDtym7RgmPTxYAHk8P9Lyhb6lOcO6TLNqyPwpxYgCbDE_Y_mC-B4X0kDQis0R8wcMCqn-PA25kWSbQgAl6fr42C',
  velvet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7ry3Ct1G7hhqmlDcf24VcUS5d9eThS5C9eDk7kYA2vCWXTk2cppvT6yMYl6nZoWNFUOzfTPA2RsHcTBSiQfF21XJEwzDmTngbJZKulVWzUGWSGfFdgDRGwAK6LGRJ0lKbSueNG_vm2rLjV6yjfMMyq-e-b3mU_AkRb-D4sy9cuYiEMmiNKchkeqULlU6xp0bA3ZLnZqMxYUHo7je5Gk8z3xkvyDB5Laap_0hOSA4e6U1AG2ZGHVo9VEiMvqq7kD7dODOjiVO_KqUL',
  sofa: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_12EJlJbSl7-UpL08AegNG8UMQ3E1HTkvs3uUA88snRzRNt0c5ERlT5AptGIAoVY3WXYf9Paav3Kq4Vlsw_pcW__vcpnqLTJEIUs0_rRlCUtGyuf1yrs5tHCfi-74NR8YOOjhz35P2V6eaNbupTIoauyQacmQbD05A0PgnV0Zxtsz2bj6ixUoSY9wrZt6zC_2ithK5FImGJEGUub8LK11Do4sDSYg0k5ipVXtMl-CSsIm4u4_GpvqFNTDGPWOmqzDL2FWP_74HmTY',
  silk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAb3j2AQpgXb0AiUx26v-cNj-Xl9xIzhOp6KxmJnPd5gwu8N816kb2md6Lj7zNRU1ClxaP_Jcm5OS18fNlO4gTzXaXcrqbJkW3DH2tqH-2HprzswZiR_1KsIOEMe8g0TyqZc2H7MWiyXACIEJQsQQhOf7ceB-CrHdkKQlmnP6DwwbO2MjjW0TeLJMsti1DxHhkoxL8wXhduAGsFrmKLuF4PaqUNdzlyhdBFTW4oCOEcZb-d0CJy-xfqJrP9zBJtZ3ZDqSYIMHmGbxT',
};

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="mb-16 md:mb-24 text-center">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-on-background leading-tight mb-6">
          Galeria Interativa
        </h1>
        <p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl font-light tracking-wide leading-relaxed">
          Uma curadoria de texturas restauradoras e formas esculturais. Explore nossas almofadas como pecas de arte funcional projetadas para o santuario do descanso.
        </p>
      </header>

      {/* Asymmetric Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Large Focus Piece */}
        <div className="md:col-span-8 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-high h-[500px] md:h-[700px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={IMAGES.hero}
              alt="Almofada de linho premium marfim em sofa bege com luz suave"
            />
            <div className="absolute bottom-10 left-10 text-on-surface">
              <span className="text-xs uppercase tracking-widest font-semibold mb-2 block opacity-60">
                Serie Principal
              </span>
              <h3 className="font-headline text-3xl md:text-4xl italic">Cloud Silk Lombar</h3>
            </div>
          </div>
        </div>

        {/* Tall Secondary Column */}
        <div className="md:col-span-4 flex flex-col gap-8 lg:gap-12">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-highest h-[400px] transition-transform duration-700 ease-out hover:scale-[1.01]">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src={IMAGES.stack}
                alt="Pilha de almofadas de linho em tons neutros terrosos"
              />
            </div>
            <div className="mt-4 px-2">
              <p className="font-headline text-xl">Heritage Weave</p>
              <p className="text-on-surface-variant text-sm tracking-wide">Algodao organico fiado a mao</p>
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface-container h-[260px] transition-transform duration-700 ease-out hover:scale-[1.01]">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src={IMAGES.detail}
                alt="Detalhe de costura em almofada verde salvia"
              />
            </div>
          </div>
        </div>

        {/* Third Row */}
        <div className="md:col-span-4 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low h-[500px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={IMAGES.velvet}
              alt="Almofada redonda de veludo ocre em cama minimalista"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
        <div className="md:col-span-8 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-high h-[500px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={IMAGES.sofa}
              alt="Sala iluminada com almofadas texturizadas em sofa boucle curvo"
            />
            <div className="absolute top-10 right-10 text-right">
              <span className="text-xs uppercase tracking-widest font-semibold mb-2 block opacity-60">
                Edicao Limitada
              </span>
              <h3 className="font-headline text-3xl">O Ensemble</h3>
            </div>
          </div>
        </div>

        {/* Floating Quote Block */}
        <div className="md:col-span-5 md:col-start-2 py-12 md:py-24">
          <p className="font-headline text-4xl lg:text-5xl leading-tight text-on-surface">
            "Conforto nao e apenas uma sensacao fisica, mas um estado mental de absoluta{' '}
            <span className="italic">quietude</span>."
          </p>
          <div className="w-20 h-px bg-primary mt-8" />
        </div>

        {/* Final Gallery Piece */}
        <div className="md:col-span-6 group cursor-pointer md:mt-12">
          <div className="relative overflow-hidden rounded-xl bg-surface-container h-[400px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={IMAGES.silk}
              alt="Macrofotografia de fibras de seda mostrando textura cintilante"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="mt-32 text-center">
        <h2 className="font-headline text-4xl mb-10">Curado para Voce</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg">Explorar Todas as Pecas</Button>
          <Button variant="secondary" size="lg">Historia dos Materiais</Button>
        </div>
      </section>
    </>
  );
}
