
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

// Estilos baseados nas diretrizes do Agente de Design (espaçamento, contraste, hierarquia)
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 30,
    borderBottom: "1pt solid #e2e8f0",
    paddingBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0f172a",
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 10,
    color: "#64748b",
  },
  link: {
    fontSize: 10,
    color: "#3b82f6",
    textDecoration: "none",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 12,
    borderBottom: "1pt solid #f1f5f9",
    paddingBottom: 6,
  },
  itemGroup: {
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e293b",
  },
  itemSubtitle: {
    fontSize: 10,
    color: "#64748b",
    fontStyle: "italic",
  },
  itemDate: {
    fontSize: 10,
    color: "#94a3b8",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 8,
  },
  bullet: {
    width: 4,
    height: 4,
    backgroundColor: "#94a3b8",
    borderRadius: 2,
    marginRight: 8,
    marginTop: 4,
  },
  bulletText: {
    fontSize: 10,
    color: "#475569",
    lineHeight: 1.5,
    flex: 1,
  },
  skillText: {
    fontSize: 10,
    color: "#475569",
    lineHeight: 1.6,
  },
});

export const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>MARIA VITÓRIA BERTO DE SOUZA</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactText}>mvitoriaberto@gmail.com</Text>
          <Text style={styles.contactText}>|</Text>
          <Text style={styles.contactText}>(83) 99924-3022</Text>
          <Text style={styles.contactText}>|</Text>
          <Text style={styles.contactText}>João Pessoa – PB</Text>
        </View>
        <View style={styles.contactRow}>
          <Link src="https://www.linkedin.com/in/maria-vitória-a93828206/" style={styles.link}>
            linkedin.com/in/maria-vitória-a93828206
          </Link>
        </View>
      </View>

      {/* Experiência Profissional */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiência Profissional</Text>
        
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>Desenvolvedora Frontend</Text>
          </View>
          <View style={styles.itemHeader}>
            <Text style={styles.itemSubtitle}>ArcturoTech</Text>
            <Text style={styles.itemDate}>2024 – Atual</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Desenvolvimento de aplicações web utilizando React, Angular e TypeScript</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Implementação de funcionalidades completas (end-to-end), integrando frontend com APIs REST</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Integração com serviços externos e consumo de APIs</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Criação de componentes reutilizáveis, responsivos e acessíveis</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Participação na arquitetura e estruturação de projetos escaláveis</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Otimização de performance de aplicações web</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Debug e resolução de problemas em ambiente de desenvolvimento</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Atuação em squads ágeis colaborando com times de backend, design e produto</Text>
          </View>
        </View>

        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>Desenvolvedora – Projetos Acadêmicos</Text>
          </View>
          <View style={styles.itemHeader}>
            <Text style={styles.itemSubtitle}>Equipe Destemidos</Text>
            <Text style={styles.itemDate}>2018 – 2020</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Desenvolvimento de soluções utilizando LEGO Mindstorms EV3</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Participação em competições como OBR e FLL</Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Desenvolvimento de lógica, resolução de problemas e trabalho em equipe</Text>
          </View>
        </View>
      </View>

      {/* Formação Acadêmica */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
        
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>Bacharelado em Ciência da Computação</Text>
          </View>
          <View style={styles.itemHeader}>
            <Text style={styles.itemSubtitle}>UNIPÊ – Centro Universitário de João Pessoa</Text>
            <Text style={styles.itemDate}>2022 – 2025</Text>
          </View>
        </View>

        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>Tecnólogo em Jogos Digitais</Text>
          </View>
          <View style={styles.itemHeader}>
            <Text style={styles.itemSubtitle}>Centro de Educação Profissional Professor Stênio Lopes</Text>
            <Text style={styles.itemDate}>2019 – 2020</Text>
          </View>
        </View>
      </View>

      {/* Habilidades e Idiomas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades & Idiomas</Text>
        <Text style={styles.skillText}>
          <Text style={{ fontWeight: "bold" }}>Linguagens: </Text>JavaScript, TypeScript, Java, HTML, CSS{"\n"}
          <Text style={{ fontWeight: "bold" }}>Frameworks & Bibliotecas: </Text>React, Angular, Tailwind, Bootstrap{"\n"}
          <Text style={{ fontWeight: "bold" }}>Conhecimentos Técnicos: </Text>APIs REST, Integração de sistemas, Conceitos de backend e lógica de negócio, Modelagem de dados (conceitual){"\n"}
          <Text style={{ fontWeight: "bold" }}>Ferramentas: </Text>Git, Figma{"\n"}
          <Text style={{ fontWeight: "bold" }}>Idiomas: </Text>Português (nativo), Inglês (intermediário)
        </Text>
      </View>

    </Page>
  </Document>
);
