/*
 *  Copyright 2017 Nuno Aguiar <nuno@aguiar.name>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package noaf;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Options;

public class CmdBase {
	final public static String noafVERSION = "";
	final public static String noafLICENSE = "Apache 2.0";
	
	public static String cmd = "CmdBase";
	protected static String envString = "";
	protected static String fileScript = "";
	protected static ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
	
	protected static Options getOptions() {
		Options ops = new Options();
		
		ops.addOption("f", true, "Reads and executes the provided script.");
		ops.addOption("e", true, "Provide an environment string");
		ops.addOption("s", false, "Execute the environment string");
		
		return ops;
	}
	
	protected static void showHelp(String cmdLineSyntax) {
		HelpFormatter formatter = new HelpFormatter();
		formatter.printHelp(cmdLineSyntax, getOptions());
	}
	
	protected static String getEnvString() {
		return envString;
	}
	
	public static ScriptEngine getEngine() {
		return engine;
	}

}

