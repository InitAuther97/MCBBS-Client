package net.mcbbs.client.fixer;

import com.google.common.collect.Maps;
import com.google.gson.*;
import com.google.gson.stream.JsonReader;
import net.mcbbs.client.util.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * @author yinyangshi InitAuther97 Yaossg
 */
public class DataFixer {

    private static final Gson GSON = new GsonBuilder().create();

    private JsonReader pullMD5Json(String loc) throws IOException {
        return new JsonReader(new BufferedReader(new InputStreamReader(IOUtils.from(loc == null ? "http://langyo.github.io/MCBBS-Client/update.json" : loc))));
    }

    public void fixUpData(String loc, String root) throws IOException {
        try (JsonReader jr = pullMD5Json(loc)) {
            JsonParser jp = new JsonParser();
            JsonElement je = jp.parse(jr);
            JsonArray array = je.getAsJsonArray();
            Map<String, FileInfo> fileMD5 = Maps.newHashMap();
            Map<String, LocalFileInfo> fileMD5Local = Maps.newHashMap();
            for (JsonElement element : array) {
                FileInfo info = GSON.fromJson(element, FileInfo.class);
                fileMD5.put(info.name, info);
            }
            // TODO new File() loves you!
            // TODO Files hates you!
            Path rootPath = Paths.get(
                    Objects.requireNonNull(new File("native/java").getParentFile()
                            .listFiles((dir, name) -> name.contentEquals("scripts")))[0].getAbsolutePath(),
                    "scripts"
            );
            Stream<Path> files = Files.walk(rootPath);
            Iterator<Path> iterator = files.iterator();
            while (iterator.hasNext()) {
                Path path = iterator.next();
                try {
                    fileMD5Local.put(path.getFileName().toString(),
                            new LocalFileInfo(
                                    MessageDigestUtils.md5(Files.newInputStream(path)),
                                    path.getFileName().toString(),
                                    path.toAbsolutePath().toString()
                            )
                    );
                } catch (NoSuchAlgorithmException e) {
                    e.printStackTrace();
                    System.exit(-1);
                }
            }
            iterator = files
                    .filter(path -> fileMD5.keySet().contains(path.getFileName().toString()))
                    .filter(t -> fileMD5.values()
                            .stream()
                            .map(fileInfo -> fileInfo.md5)
                            .noneMatch(p -> p.equals(t.toString()))
                    ).iterator();
            while (iterator.hasNext()) {
                Path next = iterator.next();
                IOUtils.combine(
                        Files.newOutputStream(next),
                        IOUtils.from(fileMD5.get(next.getFileName().toString()).path)
                ).transformAllAndClose();
            }
            System.gc();
            CollectionUtils.removeDuplicateKey(fileMD5, fileMD5Local);
            for (FileInfo value : fileMD5.values()) {
                IOUtils.combine(
                        Files.newOutputStream(Paths.get(value.dest)),
                        IOUtils.from(value.path)
                ).transformAllAndClose();
            }
            for (LocalFileInfo value : fileMD5Local.values()) {
                Files.delete(Paths.get(value.dest));
            }
        }
    }
}
