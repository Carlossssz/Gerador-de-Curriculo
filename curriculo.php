<?php 
$nome = filter_input(INPUT_POST, "nome");
$sobrenome = filter_input(INPUT_POST, "sobrenome");
$endereco = filter_input(INPUT_POST, "endereco");
$tell = filter_input(INPUT_POST, "tell");
$email = filter_input(INPUT_POST, "email");
$nascimento = filter_input(INPUT_POST, "nascimento");
$nacionalidade = filter_input(INPUT_POST, "nacionalidade");
$estadoCivil = filter_input(INPUT_POST, "estadoCivil");
$portifolio = filter_input(INPUT_POST, "portifolio");
$habilit = filter_input(INPUT_POST, "habilit");
$idioma = filter_input(INPUT_POST, "idioma");
$resumo = filter_input(INPUT_POST, "resumo");

//subInputs
$newExp0 = filter_input(INPUT_POST, "newExp0");
$newExp1 = filter_input(INPUT_POST, "newExp1");
$newExp2 = filter_input(INPUT_POST, "newExp2");
$newExp3 = filter_input(INPUT_POST, "newExp3");

$newForm0 = filter_input(INPUT_POST, "newForm0");
$newForm1 = filter_input(INPUT_POST, "newForm1");
$newForm2 = filter_input(INPUT_POST, "newForm2");
$newForm3 = filter_input(INPUT_POST, "newForm3");
////////////////////////////////////////////////////
$image = isset($_GET['image']) ? 'uploads/' . $_GET['image'] : 'default.jpg';

//echo "<b>Nome:</b> $nome <br> <b>Sobrenome:</b> $sobrenome <br> <b>Endereço:</b> $endereco <br> <b>Tell:</b> $tell <br> <b>Email:</b> $email <br> <b>Data de Nascimento:</b> $nascimento <br> <b>Nacionalidade:</b> $nacionalidade <br> <b>Estado Civil:</b> $estadoCivil";

if (isset($_FILES['fileSelector']) && $_FILES['fileSelector']['error'] == 0) {
    $allowed = ['jpg', 'jpeg', 'png', 'gif'];
    $filename = $_FILES['fileSelector']['name'];
    $filetype = $_FILES['fileSelector']['type'];
    $filesize = $_FILES['fileSelector']['size'];

    // Verifica a extensão do arquivo
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    if (!in_array(strtolower($ext), $allowed)) {
        echo "Erro: Por favor, selecione um formato de arquivo válido.";
        exit;
    }

    // Verifica o tamanho do arquivo - 5MB máximo
    if ($filesize > 5 * 1024 * 1024) {
        echo "Erro: O tamanho do arquivo é muito grande.";
        exit;
    }

    // Caminho de destino para o upload
    $upload_directory = 'uploads/';
    $destination = $upload_directory . $filename;
    
    // Exclui todos os arquivos existentes na pasta uploads
    $files = array_diff(scandir($upload_directory), array('.', '..'));
    foreach ($files as $file) {
        unlink($upload_directory . $file);
    }

    // Move o arquivo para o diretório de destino
    move_uploaded_file($_FILES['fileSelector']['tmp_name'], $destination);  
    
    } 

$upload_directory = 'uploads/';
$filename = "";
$files = glob($upload_directory . "*"); //Obtém o caminho de todos os arquivos na pasta 
if(count($files) === 1){ //Verifica se há exatamente um arquivo na pasta.
    $fileName = $files[0]; //Obtém o nome do único arquivo encontrado.
}

?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador de Currículo</title>
    <link rel="stylesheet" href="css/curriculoPhp.css">
    <style>
        #curriculoFoto{
            background-image: url("<?php echo $fileName ?>");
            background-size: cover;
            background-position: center;
        }
    </style>
</head>
<body>
    <div class="result">
        <div class="curriculo">
            <header>
                <h1 id="curriculoNome"><?php echo htmlspecialchars($nome). " ". htmlspecialchars($sobrenome); ?></h1>
                <span id="linha"></span>
            </header>

            <div id="curriculoFoto"></div>

            <div class="parteMenor">
                <div class="curriculoInfoPessoal">
                    <h4>CONTATO</h4>
                    <ul>
                        <?php if($endereco){?><li id="currEnd" class="permanente"><?php echo htmlspecialchars($endereco);?></li><?php }?>
                        <?php if($tell){?><li id="currTell" class="permanente"><?php echo htmlspecialchars($tell);?></li><?php }?>
                        <?php if($email){?><li id="currEmail" class="permanente"><?php echo htmlspecialchars($email);?></li><?php }?>
                        <?php if($nascimento){?><li id="currNasc" class="extra"><?php echo htmlspecialchars($nascimento);?></li><?php }?>
                        <?php if($nacionalidade){?><li id="currNatur" class="extra"><?php echo htmlspecialchars($nacionalidade);?></li><?php }?>
                        <?php if($estadoCivil){?><li id="currEstadoC" class="extra"><?php echo htmlspecialchars($estadoCivil);?></li><?php }?>
                        <?php if($portifolio){?><li id="currPort" class="extra"><?php echo htmlspecialchars($portifolio);?></li><?php }?>
                    </ul>
                </div>

                <?php if($idioma){?>
                    <div id="habilidades" class="campoExtra">
                        <h4>Habilidades e competências</h4>
                        <div class="habilitLista">
                            <ul id="habilidadesUl">
                                <li><?php  echo htmlspecialchars($habilit)?></li>
                            </ul>
                        </div>
                    </div>
                <?php }?>
                
                <?php if($idioma){?>
                    <div id="currIdiomas" class="campoExtra">
                        <h4>Idiomas</h4>
                        <div class="idiomaLista">
                            <ul id="idiomasUl">
                                <li><?php echo htmlspecialchars($idioma)?></li>
                            </ul>
                        </div>
                    </div>
                <?php }?>

            </div>

            <div id="curriculoCorpo" >
                <?php if ($resumo) { ?>
                    <div id="currResumo" class="campoExtra">
                        <h4>Resumo</h4>
                        <p id="currResumoText"><?php echo htmlspecialchars($resumo); ?></p>
                    </div>
                <?php } ?>

                <?php if($newExp0 || $newExp1 || $newExp2 || $newExp3){ ?>
                    <div id="currExpContainer" class="campoExtra">
                        <h4>Experiência Profissional</h4>
                        <div id="expCurriculo" class="ajustes">
                            <?php 
                                echo htmlspecialchars($newExp0) . "<br> <br>";
                                echo htmlspecialchars($newExp1) . "<br> <br>";
                                echo htmlspecialchars($newExp2) . "<br> <br>";
                                echo htmlspecialchars($newExp3) . "<br>"; 
                            ?>
                        </div>
                    </div>
                <?php } ?>
                
                <?php if($newForm0 || $newForm1 || $newForm2 || $newForm3){ ?>
                <div id="currFormacao" class="campoExtra">
                    <h4>Formação Acadêmica</h4>
                    <div id="formacaoCurriculo" class="ajustes">
                    <?php 
                            echo htmlspecialchars($newForm0) . "<br> <br>";
                            echo htmlspecialchars($newForm1) . "<br> <br>";
                            echo htmlspecialchars($newForm2) . "<br> <br>";
                            echo htmlspecialchars($newForm3) . "<br>";
                        ?>
                    </div>
                </div>
                <?php } ?>
            </div>
        </div>
    </div>
    <button onclick="window.print()" id="imprimir">Imprimir</button>
    <script src="js/scriptCurriculo.js"></script>
</body>